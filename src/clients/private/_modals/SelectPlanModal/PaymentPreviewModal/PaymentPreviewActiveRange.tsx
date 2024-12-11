import React, {memo} from 'react';
import {yyyy_mm_dd} from '^utils/dateTime';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';

interface PaymentPreviewActiveRangeProps {
    startDate: Date;
    finishDate: Date | null;
}

export const PaymentPreviewActiveRange = memo((props: PaymentPreviewActiveRangeProps) => {
    const {startDate, finishDate} = props;

    return (
        <div className="text-right">
            <div className="flex items-center gap-2">
                <span className="font-medium">{yyyy_mm_dd(startDate)}</span>
                <span>~</span>
                {finishDate && <span>{yyyy_mm_dd(finishDate)}</span>}
            </div>
            {yyyy_mm_dd(startDate) !== yyyy_mm_dd(new Date()) && (
                <div className="text-gray-400 text-12">다음 주기부터 적용 예정</div>
            )}
        </div>
    );
});
PaymentPreviewActiveRange.displayName = 'PaymentPreviewActiveRange';
