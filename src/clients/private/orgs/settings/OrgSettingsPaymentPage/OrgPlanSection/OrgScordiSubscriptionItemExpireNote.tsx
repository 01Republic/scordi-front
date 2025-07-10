import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
import {yyyy_mm_dd} from '^utils/dateTime';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface OrgScordiSubscriptionItemExpireNoteProps {
    scordiSubscription: ScordiSubscriptionDto;
}

export const OrgScordiSubscriptionItemExpireNote = memo((props: OrgScordiSubscriptionItemExpireNoteProps) => {
    const {scordiSubscription} = props;
    const {t} = useTranslation('workspaceSettings');

    const nextDate = scordiSubscription.getNextDate();

    if (!scordiSubscription.nextSubscriptionId) {
        return (
            <div className="flex items-center gap-1.5">
                <span className="text-gray-500">{t('payment.expirationDate')}:</span>
                <span>{nextDate ? yyyy_mm_dd(nextDate, '. ') : '-'}</span>
                {scordiSubscription.scordiPlan.isFreeTrial && (
                    <span className="text-gray-400 text-12">({t('payment.trialPeriodEnd')})</span>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-1.5">
            <span className="text-gray-500">{t('payment.nextRenewalDate')}:</span>
            <span>{nextDate ? yyyy_mm_dd(nextDate, '. ') : '-'}</span>
        </div>
    );
});
OrgScordiSubscriptionItemExpireNote.displayName = 'OrgScordiSubscriptionItemExpireNote';
