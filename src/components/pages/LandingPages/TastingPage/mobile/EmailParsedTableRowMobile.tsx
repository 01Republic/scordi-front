import React, {memo} from 'react';
import {GmailItem} from '^api/tasting.api';
import {useTastingItemDetailModal} from '^components/pages/LandingPages/TastingPage/TastingItemDetailModal';
import {useRecoilValue} from 'recoil';
import {displayCurrencyAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {changePriceCurrency, currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {hh_mm} from '^utils/dateTime';

export const EmailParsedTableRowMobile = memo((props: {item: GmailItem; showTitle?: boolean}) => {
    const {item, showTitle = false} = props;
    const {setModal} = useTastingItemDetailModal();
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    const date = item.metadata.date;
    const serviceName = item.provider;
    // const title = item.title;
    // const attachments = item.attachments;
    // const sender = item.metadata.sender || item.metadata.from?.replace(/.*<(.+)>/, '$1');
    const price = item.price;

    const symbol = getCurrencySymbol(displayCurrency);
    const amount = changePriceCurrency(price.amount, price.currency, displayCurrency);

    return (
        <li
            data-component="EmailParsedTableRowMobile"
            className="flex gap-4 mb-4 px-0 cursor-pointer"
            onClick={() => setModal(item)}
        >
            <div className="">
                <p className="text-[16px] font-semibold whitespace-nowrap">{serviceName}</p>
                <p className="leading-none">
                    <small className="text-xs text-gray-500">{hh_mm(date)}</small>
                </p>
            </div>

            <div className="ml-auto flex flex-col items-end max-w-[70%]">
                <p className="text-[16px] text-right font-bold">
                    {price.hide ? (
                        <span className="text-gray-500">-</span>
                    ) : (
                        <>
                            <small className="mr-1">{symbol}</small>
                            <span>{currencyFormat(amount || 0, displayCurrency)}</span>
                        </>
                    )}
                </p>
                {showTitle && (
                    <p className="leading-none text-right font-light">
                        <small className="text-xs text-gray-500">{item.title}</small>
                    </p>
                )}
            </div>
        </li>
    );
});
