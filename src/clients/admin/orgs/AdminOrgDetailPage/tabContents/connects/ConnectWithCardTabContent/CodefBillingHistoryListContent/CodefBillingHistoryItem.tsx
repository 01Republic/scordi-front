import React, {memo, useState} from 'react';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {CardTableTR} from '^admin/share';
import {hh_mm, lpp} from '^utils/dateTime';
import {CodefCardTagUI} from '^admin/factories/codef-parser-factories/form/share/CodefCardTagUI';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {Check} from 'lucide-react';
import {subHours} from 'date-fns';
import {toast} from 'react-hot-toast';
import {CreateBillingHistoryModal} from './CreateBillingHistoryModal';

interface CodefBillingHistoryItemProps {
    codefBillingHistory: CodefBillingHistoryDto;
    onCardSelect: (codefCard?: CodefCardDto) => any;
}

export const CodefBillingHistoryItem = memo((props: CodefBillingHistoryItemProps) => {
    const {codefBillingHistory, onCardSelect} = props;

    const yyyymmdd = lpp(subHours(codefBillingHistory.usedAt, 9), 'P');
    const hhmmss = hh_mm(subHours(codefBillingHistory.usedAt, 9));
    const memberStoreName = codefBillingHistory.resMemberStoreName;
    // const finalPrice = (() => {
    //     const integerStr = parseInt(codefBillingHistory.resUsedAmount).toLocaleString();
    //     const sub = Math.round((parseFloat(codefBillingHistory.resUsedAmount) % 1) * 100).toString();
    //     return `${integerStr}.${sub}`;
    // })();
    const finalPrice = codefBillingHistory.usedAmountStr;
    const currency = codefBillingHistory.resAccountCurrency;
    const status = codefBillingHistory.memo;

    return (
        <CardTableTR
            gridClass="grid-cols-14"
            className={`!text-12 cursor-pointer group`}
            onClick={() => console.log(codefBillingHistory)}
        >
            {/* ID */}
            <div>
                <span className="badge badge-xs">#{codefBillingHistory.id}</span>
            </div>

            {/* 승인일시 */}
            <div className="col-span-2 flex items-center gap-1">
                <span
                    className="tooltip tooltip-primary"
                    // data-tip={`등록일: ${yyyy_mm_dd_hh_mm(subHours(codefBillingHistory.createdAt, 9))}`}
                    data-tip={`등록일: ${lpp(codefBillingHistory.createdAt)}`}
                >
                    {yyyymmdd}
                </span>

                <span
                    className="tooltip tooltip-primary text-10 font-light"
                    data-tip={`승인일시: ${codefBillingHistory.resUsedDate} ${codefBillingHistory.resUsedTime}`}
                >
                    {hhmmss}
                </span>
            </div>

            {/* 승인번호 */}
            <div className="flex items-center text-11">
                <span>{codefBillingHistory.resApprovalNo}</span>
            </div>

            {/* 카드 */}
            <div className="flex items-center">
                <div>
                    <CodefCardTagUI codefCard={codefBillingHistory.codefCard} onClick={onCardSelect} />
                </div>
            </div>

            {/* 제목 */}
            <div className="col-span-3">
                <div className="w-full whitespace-nowrap overflow-scroll no-scrollbar">
                    <span>{memberStoreName}</span>
                </div>
            </div>

            {/* 금액 */}
            <div className="col-span-2 flex items-center justify-end">
                <span>{finalPrice}</span> <small>({currency})</small>
            </div>

            {/* 결제상태 */}
            <div>
                <span className="text-red-500 font-semibold whitespace-nowrap">{status}</span>
            </div>

            {/* 해외결제여부 */}
            {/*<div>{codefBillingHistory}</div>*/}

            {/* 스코디 연동 */}
            <div>
                {codefBillingHistory.billingHistoryId ? (
                    <Check className="text-green-600" fontSize={18} />
                ) : (
                    <CreateBillingHistoryButton codefBillingHistory={codefBillingHistory} />
                )}
            </div>

            <div></div>
            <div></div>
        </CardTableTR>
    );
});
CodefBillingHistoryItem.displayName = 'CodefBillingHistoryItem';

const CreateBillingHistoryButton = (props: {codefBillingHistory: CodefBillingHistoryDto}) => {
    const {codefBillingHistory} = props;
    const [subject, setSubject] = useState<CodefBillingHistoryDto>();

    if (!codefBillingHistory.codefCard?.creditCardId) {
        return (
            <Check
                className="text-red-600 opacity-0 hover:opacity-80 transition-all"
                fontSize={18}
                onClick={() => toast.error('스코디 카드를 먼저 연결해주세요.')}
            />
        );
    }

    return (
        <>
            <Check
                className="text-green-600 opacity-0 hover:opacity-50 transition-all"
                fontSize={18}
                onClick={() => setSubject(codefBillingHistory)}
            />
            <CreateBillingHistoryModal codefBillingHistory={subject} onClose={() => setSubject(undefined)} />
        </>
    );
};
