import React, {memo} from 'react';
import {hh_mm} from '^utils/dateTime';
import {useRouter} from 'next/router';
import {BillingListPriceText} from './PriceText';
import {BillingScheduleShallowDto} from '^models/BillingSchedule/type';
import {BillingHistoryStatus} from '^models/BillingHistory/type';

export const ScheduleItem = memo((props: {entry: BillingScheduleShallowDto; showTitle?: boolean}) => {
    const {entry: billingSchedule, showTitle = false} = props;
    const router = useRouter();

    const status = billingSchedule.getStatus();
    const showTitleByStatus = (() => {
        if (status === BillingHistoryStatus.Info) return true;
        if (status === BillingHistoryStatus.Unknown) return true;
        if (status === BillingHistoryStatus.PayFail) return true;
        return false;
    })();

    const onClick = () => console.log(billingSchedule);

    return (
        <li
            data-component="ScheduleItem"
            data-resource_name="BillingSchedule"
            data-resource_data={JSON.stringify(billingSchedule)}
            className="flex gap-4 mb-4 px-0 cursor-pointer"
            onClick={onClick}
        >
            <div className="">
                <p className="text-[16px] font-semibold whitespace-nowrap">{billingSchedule.serviceName}</p>
                <p className="leading-none">
                    <small className="text-xs text-gray-500">{hh_mm(billingSchedule.sortKey)}</small>
                </p>
            </div>

            <div className="ml-auto flex flex-col items-end max-w-[70%]">
                <p className="text-[16px] text-right font-bold">
                    <BillingListPriceText amount={billingSchedule.payAmount} status={status} />
                </p>
                {(showTitle || showTitleByStatus) && (
                    <p className="leading-none text-right font-light">
                        <small className="text-xs text-gray-500" style={{wordBreak: 'keep-all'}}>
                            {billingSchedule.pageSubject}
                        </small>
                    </p>
                )}
            </div>
        </li>
    );
});
