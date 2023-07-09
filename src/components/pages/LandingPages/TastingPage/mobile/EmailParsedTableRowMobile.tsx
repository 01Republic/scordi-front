import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {hh_mm} from '^utils/dateTime';
import {BillingHistoryDto} from '^types/billing.type';
import {changePriceCurrency, currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {displayCurrencyAtom} from '../pageAtoms';
import {useTastingItemDetailModal} from '../TastingItemDetailModal';

export const EmailParsedTableRowMobile = memo((props: {entry: BillingHistoryDto; showTitle?: boolean}) => {
    const {entry: billingHistory, showTitle = false} = props;
    const {setModal} = useTastingItemDetailModal();
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    const date = new Date(billingHistory.issuedAt);
    const payAmount = billingHistory.payAmount;
    const item = billingHistory.emailContent!;
    const serviceName = item.provider;
    // const title = item.title;
    // const attachments = item.attachments;
    // const sender = item.metadata.sender || item.metadata.from?.replace(/.*<(.+)>/, '$1');

    return (
        <li
            data-component="EmailParsedTableRowMobile"
            className="flex gap-4 mb-4 px-0 cursor-pointer"
            onClick={() => setModal(billingHistory)}
        >
            <div className="">
                <p className="text-[16px] font-semibold whitespace-nowrap">{serviceName}</p>
                <p className="leading-none">
                    <small className="text-xs text-gray-500">{hh_mm(date)}</small>
                </p>
            </div>

            <div className="ml-auto flex flex-col items-end max-w-[70%]">
                <p className="text-[16px] text-right font-bold">
                    {!payAmount ? (
                        <span className="text-gray-500">-</span>
                    ) : (
                        <>
                            <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
                            <span>
                                {currencyFormat(
                                    changePriceCurrency(payAmount.amount, payAmount.code, displayCurrency) || 0,
                                    displayCurrency,
                                )}
                            </span>
                        </>
                    )}
                </p>
                {showTitle && (
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
