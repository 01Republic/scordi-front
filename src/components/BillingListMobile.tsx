import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {SubscriptionDto} from '^types/subscription.type';
import {OrgAppShowPageRoute} from '^pages/orgs/[id]/apps/[appId]';
import {BillingScheduleShallowDto as ScheduleDto} from '^types/billing.type';
import {intlDateShort, yyyy_mm_dd} from '^utils/dateTime';
import {useDashboardSummary} from '^hooks/useDashboardSummary';
import {useCalendar} from '^hooks/useCalendar';
import {useSubscriptions} from '^hooks/useSubscriptions';
import {MobileSection} from '^components/v2/MobileSection';
import {didPayAppsState, getBillingSchedulesParamsState, willPayAppsState} from '^atoms/billingHistories.atom';
import {getSubscriptionsParamsState} from '^atoms/subscriptions.atom';

export const BillingListMobile = memo(() => {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const {year, month} = useCalendar();
    const summaryDto = useDashboardSummary();
    const appsQueryResult = useSubscriptions();
    const setAppsQueryParam = useSetRecoilState(getSubscriptionsParamsState);
    const setSchedulesQueryParam = useSetRecoilState(getBillingSchedulesParamsState);
    const willPayApps = useRecoilValue(willPayAppsState);
    const didPayApps = useRecoilValue(didPayAppsState);

    const startDate = yyyy_mm_dd(new Date(year, month - 1, 1));
    const endDate = yyyy_mm_dd(new Date(year, month, 0));
    const updateQueryParam = () => {
        setSchedulesQueryParam({where: {organizationId}, startDate, endDate});
    };

    useEffect(() => {
        if (isNaN(organizationId)) return;
        updateQueryParam();
        setAppsQueryParam({
            where: {organizationId},
            order: {id: 'DESC'},
            itemsPerPage: 300,
        });
    }, [organizationId]);

    useEffect(() => {
        updateQueryParam();
    }, [year, month]);

    if (!summaryDto || !organizationId || !appsQueryResult) return <></>;
    const {items: apps} = appsQueryResult;

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
                            onClick={() => router.push(OrgAppShowPageRoute.path(organizationId, app.applicationId))}
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
                            onClick={() => router.push(OrgAppShowPageRoute.path(organizationId, app.applicationId))}
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
    app: SubscriptionDto;
    onClick?: () => void;
    shallow?: ScheduleDto;
};

const BillingListMobileItem = memo((props: BillingListMobileItemProps) => {
    const {shallow: schedule, app} = props;
    const amount = schedule?.billingAmount || 0;
    const billingDate = schedule?.billingDate || '';
    const billingDateStr = intlDateShort(billingDate);
    const product = app.product || {};
    const serviceName = product.name;

    // 결제가 안됐는데(결제기록이 존재하지 않음) 그대로 시간이 지나버린 건.
    // -> '지금까지 결제한 금액'으로 놓기에는 어색하여, '앞으로 결제될 금액'에서 보여짐.
    const somethingWrong = schedule?.isOverdue && schedule?.isSuccess === false;

    return (
        <div className={'flex bg-[#F9FAFB] rounded-[14px] p-[14px] items-center mb-3'} onClick={props.onClick}>
            <div className={`avatar ${somethingWrong ? 'opacity-50' : ''}`}>
                <div className="mask mask-squircle h-12 w-12">
                    <img src={product.image} alt={`${serviceName} logo`} />
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
