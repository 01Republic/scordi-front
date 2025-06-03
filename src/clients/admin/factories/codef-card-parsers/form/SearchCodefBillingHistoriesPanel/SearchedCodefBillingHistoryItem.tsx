import {memo, useState} from 'react';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {hh_mm, yyyy_mm_dd, yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefCardTagUI} from '^admin/factories/codef-parser-factories/form/share/CodefCardTagUI';
import Tippy from '@tippyjs/react';
import {Check, ChevronDown, EyeOff} from 'lucide-react';

interface SearchedCodefBillingHistoryItemProps {
    data: CodefBillingHistoryDto;
    onCardSelect: (codefCard?: CodefCardDto) => any;
    preventHidden?: boolean;
}

export const SearchedCodefBillingHistoryItem = memo((props: SearchedCodefBillingHistoryItemProps) => {
    const {data: codefBillingHistory, onCardSelect, preventHidden = false} = props;
    const [isHidden, setIsHidden] = useState(false);

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
        <div className={isHidden ? 'hidden' : 'grid grid-cols-12 text-12 h-[22px]'}>
            <div className="col-span-2 flex items-center gap-1">
                <span
                    className="tooltip tooltip-primary"
                    data-tip={`등록일: ${yyyy_mm_dd_hh_mm(codefBillingHistory.createdAt)}`}
                >
                    {yyyymmdd}
                </span>
            </div>
            <div className="flex items-center">{hhmmss}</div>
            <div className="flex items-center">
                <div>
                    <CodefCardTagUI codefCard={codefBillingHistory.codefCard} onClick={onCardSelect} />
                </div>
            </div>
            <div className="col-span-5 flex items-center gap-3">
                <div className="w-full whitespace-nowrap overflow-scroll no-scrollbar">
                    <span>{memberStoreName}</span>
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
                        <Check className="text-green-400 mr-1 cursor-pointer" />
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
