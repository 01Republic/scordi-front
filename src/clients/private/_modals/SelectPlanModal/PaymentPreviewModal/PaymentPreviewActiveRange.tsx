import React, {memo} from 'react';
import {yyyy_mm_dd} from '^utils/dateTime';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';

interface PaymentPreviewActiveRangeProps {
    plan: ScordiPlanDto;
    currentSubscription: ScordiSubscriptionDto | null;
}

export const PaymentPreviewActiveRange = memo((props: PaymentPreviewActiveRangeProps) => {
    const {plan, currentSubscription} = props;

    const startDate = getStartDate(plan, currentSubscription);
    const nextDate = plan.getNextDate(startDate);

    return (
        <div className="text-right">
            <div className="flex items-center gap-2">
                <span className="font-medium">{yyyy_mm_dd(startDate)}</span>
                <span>~</span>
                {nextDate && <span>{yyyy_mm_dd(nextDate)}</span>}
            </div>
            {yyyy_mm_dd(startDate) !== yyyy_mm_dd(new Date()) && (
                <div className="text-gray-400 text-12">다음 주기부터 적용 예정</div>
            )}
        </div>
    );
});
PaymentPreviewActiveRange.displayName = 'PaymentPreviewActiveRange';

function getStartDate(plan: ScordiPlanDto, currentSubscription: ScordiSubscriptionDto | null) {
    const now = new Date();

    if (!currentSubscription) return now;

    if (currentSubscription.scordiPlan.priority > plan.priority || currentSubscription.scordiPlan.price > plan.price) {
        return currentSubscription.getNextDate() || now;
    }

    return now;
}
