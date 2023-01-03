import {ApplicationDto} from '^types/application.type';
import React, {memo, useEffect, useState} from 'react';
import {AppInfoPageRoute} from '^pages/orgs/[id]/apps/[appId]';
import {useRouter} from 'next/router';
import {getBillingHistories, getBillingSchedules} from '^api/billing.api';
import {errorNotify} from '^utils/toast-notify';
import {BillingHistoryDto, BillingScheduleShallowDto as ScheduleDto} from '^types/billing.type';
import {intlDateShort, yyyy_mm_dd} from '^utils/dateTime';
import {DashboardSummaryDto} from '^types/dashboard.type';
import {useDashboardSummary} from '^hooks/useDashboardSummary';
import {useCalendar} from '^hooks/useCalendar';
import {useApplications} from '^hooks/useApplications';
import {MobileSection} from '^components/v2/MobileSection';

const sortByBillingDate = (direct: 'ASC' | 'DESC') => (a: ScheduleDto, b: ScheduleDto) => {
    const diff = new Date(a.billingDate).getTime() - new Date(b.billingDate).getTime();
    return direct === 'ASC' ? diff : diff * -1;
};

export const BillingListMobile = memo(() => {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const {year, month} = useCalendar();
    const {summaryDto} = useDashboardSummary();
    const {applications: apps} = useApplications();
    const [willPayApps, setWillPayApps] = useState<ScheduleDto[]>([]);
    const [didPayApps, setDidPayApps] = useState<ScheduleDto[]>([]);

    if (!organizationId) return <></>;

    const orgId = organizationId.toString();

    const billingParams = {
        startDate: yyyy_mm_dd(new Date(year, month - 1, 1)),
        endDate: yyyy_mm_dd(new Date(year, month, 0)),
    };

    useEffect(() => {
        if (!router.query.id) return;

        // TODO: 결제 전 후 구분해서 따로 array에 담기
        // getBillingHistories(billingParams)
        //     .then((res) => setBeforeApps(res.data.items))
        //     .catch((err) => errorNotify(err));
        getBillingSchedules(billingParams)
            .then(({data}) => {
                setWillPayApps(data.items.filter((d) => !d.isSuccess).sort(sortByBillingDate('DESC')));
                setDidPayApps(data.items.filter((d) => d.isSuccess).sort(sortByBillingDate('DESC')));
            })
            .catch((err) => errorNotify(err));
    }, [apps, year, month]);

    if (!summaryDto) return <></>;

    return (
        <MobileSection>
            {willPayApps.length > 0 && (
                <>
                    <BillingListTitle title={'앞으로 결제될 금액'} price={summaryDto.willPayAmount} />
                    {willPayApps.map((app, index) => (
                        <BillingListMobileItem
                            shallow={app}
                            app={apps.find((item) => item.id === app.applicationId)!}
                            key={index}
                            onClick={() => router.push(AppInfoPageRoute.path(orgId, app.applicationId.toString()))}
                        />
                    ))}
                </>
            )}
            {didPayApps.length > 0 && (
                <>
                    <BillingListTitle title={'지금까지 결제한 금액'} price={summaryDto.didPayAmount} />
                    {didPayApps.map((app, index) => (
                        <BillingListMobileItem
                            shallow={app}
                            app={apps.find((item) => item.id === app.applicationId)!}
                            key={index}
                            onClick={() => router.push(AppInfoPageRoute.path(orgId, app.applicationId.toString()))}
                        />
                    ))}
                </>
            )}
        </MobileSection>
    );
});

type BillingListTitleProps = {
    title: string;
    price: number;
};

const BillingListTitle = memo((props: BillingListTitleProps) => {
    return (
        <div className={'flex justify-between text-[15px] py-1.5 mb-3'}>
            <p className={'text-[#6D7684]'}>{props.title}</p>
            <p className={'font-bold'}>US${props.price.toLocaleString()}</p>
        </div>
    );
});

type BillingListMobileItemProps = {
    app: ApplicationDto;
    onClick?: () => void;
    shallow?: ScheduleDto;
};

const BillingListMobileItem = memo((props: BillingListMobileItemProps) => {
    const {shallow: schedule, app} = props;
    const amount = schedule?.billingAmount || 0;
    const billingDate = schedule?.billingDate || '';
    const billingDateStr = intlDateShort(billingDate);
    const prototype = app.prototype || {};
    const serviceName = prototype.name;

    // 결제가 안됐는데(결제기록이 존재하지 않음) 그대로 시간이 지나버린 건.
    // -> '지금까지 결제한 금액'으로 놓기에는 어색하여, '앞으로 결제될 금액'에서 보여짐.
    const somethingWrong = schedule?.isOverdue && schedule?.isSuccess === false;

    return (
        <div className={'flex bg-[#F9FAFB] rounded-[14px] p-[14px] items-center mb-3'} onClick={props.onClick}>
            <div className={`avatar ${somethingWrong ? 'opacity-50' : ''}`}>
                <div className="mask mask-squircle h-12 w-12">
                    <img src={prototype.image} alt={`${serviceName} logo`} />
                </div>
            </div>
            <div className={`pl-[10px]`}>
                <p className={'text-[#8D95A1] capitalize font-semibold'}>{serviceName}</p>
                <p className={`font-bold ${somethingWrong ? 'opacity-50 line-through text-red-400' : ''}`}>
                    US${amount.toLocaleString()}
                </p>
            </div>
            <div className={'flex-1'} />
            <div className={`p-[10px] ${somethingWrong ? 'bg-red-200' : 'bg-[#F3F0FF]'} rounded-[12px]`}>
                <p className={`${somethingWrong ? 'text-red-400' : 'text-[#7963F7]'} font-bold`}>
                    {billingDateStr}
                    <span className={`badge badge-error text-white font-bold ml-2`}>!</span>
                </p>
            </div>
        </div>
    );
});
