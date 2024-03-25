import {memo} from 'react';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {hh_mm, yyyy_mm_dd} from '^utils/dateTime';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefCardTagUI} from '^admin/factories/codef-parser-factories/form/share/CodefCardTagUI';

interface SearchedCodefBillingHistoryItemProps {
    data: CodefBillingHistoryDto;
    onCardSelect: (codefCard?: CodefCardDto) => any;
}

export const SearchedCodefBillingHistoryItem = memo((props: SearchedCodefBillingHistoryItemProps) => {
    const {data: codefBillingHistory, onCardSelect} = props;

    const yyyymmdd = yyyy_mm_dd(codefBillingHistory.usedAt);
    const hhmmss = hh_mm(codefBillingHistory.usedAt);
    const memberStoreName = codefBillingHistory.resMemberStoreName;
    const finalPrice = (() => {
        const integerStr = parseInt(codefBillingHistory.resUsedAmount).toLocaleString();
        const sub = Math.round((parseFloat(codefBillingHistory.resUsedAmount) % 1) * 100).toString();
        return `${integerStr}.${sub}`;
    })();
    const currency = codefBillingHistory.resAccountCurrency;
    const status = codefBillingHistory.memo;

    return (
        <div className="grid grid-cols-12 text-12 h-[22px]">
            <div className="col-span-2">{yyyymmdd}</div>
            <div className="">{hhmmss}</div>
            <div className="">
                <CodefCardTagUI codefCard={codefBillingHistory.codefCard} onClick={onCardSelect} />
            </div>
            <div className="col-span-5">
                <div className="w-full whitespace-nowrap overflow-scroll no-scrollbar">{memberStoreName}</div>
            </div>
            <div className={`col-span-3 text-right ${status && 'opacity-50 line-through'}`}>
                <span>{finalPrice}</span> <small>({currency})</small>{' '}
                {status ? <span className="text-red-500 font-semibold">{status}</span> : <span></span>}
            </div>
        </div>
    );
});
SearchedCodefBillingHistoryItem.displayName = 'SearchedCodefBillingHistoryItem';
