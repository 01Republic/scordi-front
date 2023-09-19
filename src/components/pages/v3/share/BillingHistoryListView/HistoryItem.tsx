import React, {memo} from 'react';
import {BillingHistoryDto, BillingHistoryStatus, getBillingHistoryStatus} from '^types/billing.type';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {hh_mm} from '^utils/dateTime';
import {PriceText} from '^v3/share/BillingHistoryListView/PriceText';
import {useRouter} from 'next/router';
import {V3OrgBillingHistoryDetailPageRoute} from '^pages/v3/orgs/[orgId]/billingHistories/[id]';
import {orgIdParamState} from '^atoms/common';

export const HistoryItem = memo((props: {entry: BillingHistoryDto; showTitle?: boolean}) => {
    const {entry: billingHistory, showTitle = false} = props;
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

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

    const onClick = () => {
        router.push(V3OrgBillingHistoryDetailPageRoute.path(orgId, billingHistory.id));
    };

    return (
        <li
            data-component="EmailParsedTableRowMobile"
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
