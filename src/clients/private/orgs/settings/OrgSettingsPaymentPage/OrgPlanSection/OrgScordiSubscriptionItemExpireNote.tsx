import React, {memo} from 'react';
import {yyyy_mm_dd} from '^utils/dateTime';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';

interface OrgScordiSubscriptionItemExpireNoteProps {
    scordiSubscription: ScordiSubscriptionDto;
}

export const OrgScordiSubscriptionItemExpireNote = memo((props: OrgScordiSubscriptionItemExpireNoteProps) => {
    const {scordiSubscription} = props;

    const nextDate = scordiSubscription.getNextDate();

    if (!scordiSubscription.nextSubscriptionId) {
        return (
            <div className="flex items-center gap-1.5">
                <span className="text-gray-500">종료 예정일 :</span>
                <span>{nextDate ? yyyy_mm_dd(nextDate, '. ') : '-'}</span>
                {scordiSubscription.scordiPlan.isFreeTrial && (
                    <span className="text-gray-400 text-12">(체험 기간 종료)</span>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1.5">
            <span className="text-gray-500">다음 갱신일 :</span>
            <span>{nextDate ? yyyy_mm_dd(nextDate, '. ') : '-'}</span>
        </div>
    );
});
OrgScordiSubscriptionItemExpireNote.displayName = 'OrgScordiSubscriptionItemExpireNote';
