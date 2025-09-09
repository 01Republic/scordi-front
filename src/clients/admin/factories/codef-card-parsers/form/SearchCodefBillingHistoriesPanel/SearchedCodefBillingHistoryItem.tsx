import {memo, useState} from 'react';
import {checkCodefBillingHistoryNeedToFixTimeZone, CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {hh_mm, lpp, yyyy_mm_dd, yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefCardTagUI} from '^admin/factories/codef-parser-factories/form/share/CodefCardTagUI';
import Tippy from '@tippyjs/react';
import {Check, ChevronDown, EyeOff} from 'lucide-react';
import {eventCut} from '^utils/event';
import {codefBillingHistoriesAdminApi} from '^models/CodefBillingHistory/api';
import {errorToast} from '^api/api';

interface SearchedCodefBillingHistoryItemProps {
    data: CodefBillingHistoryDto;
    onCardSelect: (codefCard?: CodefCardDto) => any;
    preventHidden?: boolean;
    reload?: () => any;
}

export const SearchedCodefBillingHistoryItem = memo((props: SearchedCodefBillingHistoryItemProps) => {
    const {data: codefBillingHistory, onCardSelect, preventHidden = false, reload} = props;
    const [isHidden, setIsHidden] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const finalPrice = codefBillingHistory.usedAmountStr;
    const currency = codefBillingHistory.resAccountCurrency;
    const status = codefBillingHistory.memo;

    return (
        <div
            className={
                isHidden
                    ? 'hidden'
                    : `grid grid-cols-12 text-12 h-[22px] ${isLoading ? 'opacity-50 pointer-events-none' : ''}`
            }
            onClick={() => console.log(codefBillingHistory)}
        >
            <div
                className="col-span-3 flex items-center gap-1"
                onContextMenu={(e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    codefBillingHistoriesAdminApi
                        .fixTimeZone({where: {id: codefBillingHistory.id}})
                        .then(() => reload && reload())
                        .catch(errorToast)
                        .finally(() => setIsLoading(false));
                }}
            >
                <Tippy content={`승인일시: ${codefBillingHistory.resUsedDate} ${codefBillingHistory.resUsedTime}`}>
                    <div
                        className={`flex items-center w-full gap-1 ${
                            checkCodefBillingHistoryNeedToFixTimeZone(codefBillingHistory) ? 'text-red-500' : ''
                        }`}
                    >
                        <div>{lpp(codefBillingHistory.usedAt, 'P')}</div>
                        <small>{lpp(codefBillingHistory.usedAt, 'p')}</small>
                    </div>
                </Tippy>
            </div>

            <div className="flex items-center">
                <div onClick={eventCut}>
                    <CodefCardTagUI codefCard={codefBillingHistory.codefCard} onClick={onCardSelect} />
                </div>
            </div>

            <div className="col-span-5 flex items-center gap-3">
                <div className="w-full whitespace-nowrap overflow-scroll no-scrollbar">
                    <span>{codefBillingHistory.resMemberStoreName}</span>
                </div>
                <div className="">
                    {!preventHidden && (
                        <EyeOff
                            onClick={() => setIsHidden(true)}
                            className="text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                        />
                    )}
                </div>
            </div>
            <div className={`col-span-3 flex items-center justify-end ${status && 'opacity-50 line-through'}`}>
                {codefBillingHistory.billingHistoryId && (
                    <div data-tip="파서로 연동된 결제내역" className="tooltip tooltip-primary">
                        <Check className="text-green-500 mr-1 cursor-pointer" fontSize={14} />
                    </div>
                )}
                <span>{finalPrice}</span> <small>({currency})</small>{' '}
                {status ? (
                    <span className="text-red-500 font-semibold whitespace-nowrap">{status}</span>
                ) : (
                    <span></span>
                )}
            </div>
        </div>
    );
});
SearchedCodefBillingHistoryItem.displayName = 'SearchedCodefBillingHistoryItem';
