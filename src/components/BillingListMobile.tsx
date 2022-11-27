import { ApplicationDto } from '^types/application.type';
import { useEffect, useState } from 'react';
import { AppInfoPageRoute } from '^pages/orgs/[id]/apps/[appId]';
import { useRouter } from 'next/router';
import {getBillingHistories, getBillingSchedules} from "^api/billing.api";
import {errorNotify} from "^utils/toast-notify";
import {BillingHistoryDto, BillingScheduleShallowDto} from "^types/billing.type";
import {intlDateShort} from "^utils/dateTime";

type BillingListMobileProps = {
    summaryDto: DashboardSummaryDto;
    apps: ApplicationDto[];
    year: number;
    month: number;
};

export const BillingListMobile = (props: BillingListMobileProps) => {
    const router = useRouter();
    const { summaryDto, apps, year, month } = props;
    const [beforeApps, setBeforeApps] = useState<BillingHistoryDto[]>([]);
    const [afterApps, setAfterApps] = useState<BillingScheduleShallowDto[]>([]);

    const orgId = router.query.id!.toString();

    const billingParams = {
        startDate: `${year}-${month}-01`,
        endDate: `${year}-${month}-31`,
    }

    useEffect(() => {
        // TODO: 결제 전 후 구분해서 따로 aaray에 담기
        getBillingHistories(billingParams).then((res) => setBeforeApps(res.data.items)).catch((err) => errorNotify(err));
        getBillingSchedules(billingParams).then((res) => setAfterApps(res.data.items)).catch((err) => errorNotify(err));
    }, [apps]);

    return (
        <>
            {afterApps.length > 0 && (
                <>
                    <BillingListTitle
                        title={'앞으로 결제될 금액'}
                        price={summaryDto.willPayAmount}
                    />
                    {afterApps.map((app, index) => (
                        <BillingListMobileItem
                            shallow={app}
                            app={apps.find(item => item.id === app.applicationId)!}
                            key={index}
                            onClick={() =>
                                router.push(AppInfoPageRoute.path(orgId, app.applicationId.toString()))
                            }
                        />
                    ))}
                </>
            )}
            {beforeApps.length > 0 && (
                <>
                    <BillingListTitle
                        title={'지금까지 결제한 금액'}
                        price={summaryDto.didPayAmount}
                    />
                    {beforeApps.map((app, index) => (
                        <BillingListMobileItem
                            history={app}
                            app={apps.find(item => item.id === app.applicationId)!}
                            key={index}
                            onClick={() =>
                                router.push(AppInfoPageRoute.path(orgId, app.applicationId.toString()))
                            }
                        />
                    ))}
                </>
            )}
        </>
    );
};

type BillingListTitleProps = {
    title: string;
    price: number;
};

const BillingListTitle = (props: BillingListTitleProps) => {
    return (
        <div className={'flex justify-between text-[15px]'}>
            <p className={'text-[#6D7684]'}>{props.title}</p>
            <p className={'font-bold'}>USD {props.price.toLocaleString()}</p>
        </div>
    );
};

type BillingListMobileItemProps = {
    app: ApplicationDto;
    onClick?: () => void;
    history?: BillingHistoryDto;
    shallow?: BillingScheduleShallowDto;
};

const BillingListMobileItem = (props: BillingListMobileItemProps) => {
    const amount = props.history?.paidAmount || props.shallow?.billingAmount || 0;
    const billingDate = props.history?.paidAt || props.shallow?.billingDate || '';
    const billingDateStr = intlDateShort(billingDate);

    return (
        <div
            className={'flex bg-[#F9FAFB] rounded-[14px] p-[14px] items-center'}
            onClick={props.onClick}
        >
            <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                    <img
                        src={props.app.prototype.image}
                        alt={`${props.app.prototype.name} logo`}
                    />
                </div>
            </div>
            <div className={'pl-[10px]'}>
                <p className={'text-[#8D95A1] font-semibold'}>
                    {props.app.prototype.name}
                </p>
                <p className="font-bold">
                    USD {(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
            </div>
            <div className={'flex-1'} />
            <div className={'p-[10px] bg-[#F3F0FF] rounded-[12px]'}>
                <p className={'text-[#7963F7] font-bold'}>{billingDateStr}</p>
            </div>
        </div>
    );
};
