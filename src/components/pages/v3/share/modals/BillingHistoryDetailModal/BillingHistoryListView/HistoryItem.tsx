import React, {memo} from 'react';
import {BillingHistoryDto, BillingHistoryStatus, getBillingHistoryStatus} from '^types/billing.type';
import {hh_mm} from '^utils/dateTime';
import {useRouter} from 'next/router';
import {useBillingHistoryModal} from '../hook';
import {PriceText} from './PriceText';

export const HistoryItem = memo((props: {entry: BillingHistoryDto; showTitle?: boolean}) => {
    const {entry: billingHistory, showTitle = false} = props;
    const router = useRouter();
    const {showModal} = useBillingHistoryModal();

    const date = new Date(billingHistory.issuedAt);
    const payAmount = billingHistory.payAmount;
    const item = billingHistory.emailContent!;
    const serviceName = item.provider;

    const status = getBillingHistoryStatus(billingHistory);
    const showTitleByStatus = (() => {
        if (status === BillingHistoryStatus.Info) return true;
        if (status === BillingHistoryStatus.Unknown) return true;
        if (status === BillingHistoryStatus.PayFail) return true;
        return false;
    })();

    const onClick = () => showModal(billingHistory.id, billingHistory.subscriptionId!);

    return (
        <li
            id={`HistoryItem-${billingHistory.id}`}
            data-component="HistoryItem"
            data-resource_name="BillingHistory"
            data-resource_id={billingHistory.id}
            className="flex gap-4 mb-4 px-0 cursor-pointer"
            onClick={onClick}
        >
            <div className="">
                <p className="text-[16px] font-semibold whitespace-nowrap">{serviceName}</p>
                <p className="leading-none">
                    <small className="text-xs text-gray-500">{hh_mm(date)}</small>
                </p>
            </div>

            <div className="ml-auto flex flex-col items-end max-w-[70%]">
                <p className="text-[16px] text-right font-bold">
                    <PriceText billingHistory={billingHistory} status={status} />
                </p>
                {(showTitle || showTitleByStatus) && (
                    <p className="leading-none text-right font-light">
                        <small className="text-xs text-gray-500" style={{wordBreak: 'keep-all'}}>
                            {item.title}
                        </small>
                    </p>
                )}
            </div>
        </li>
    );
});
