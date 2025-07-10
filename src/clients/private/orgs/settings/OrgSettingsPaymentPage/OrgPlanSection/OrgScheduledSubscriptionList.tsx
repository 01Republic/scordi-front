import {scordiSubscriptionApi} from '^models/_scordi/ScordiSubscription/api';
import {
    scordiSubscriptionIsScheduledListLoadingAtom as scheduledIsLoadingAtom,
    scordiSubscriptionScheduledListAtom as scheduledListAtom,
} from '^models/_scordi/ScordiSubscription/atom';
import {useTranslation} from 'next-i18next';
import {memo, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {OrgScheduledSubscriptionItem} from './OrgScheduledSubscriptionItem';

interface OrgScheduledSubscriptionListProps {
    orgId: number;
}

export const OrgScheduledSubscriptionList = memo((props: OrgScheduledSubscriptionListProps) => {
    const {orgId} = props;
    const {t} = useTranslation('workspaceSettings');
    // const {isLoading, scheduledSubscriptions, fetch} = useScheduledScordiSubscriptions();
    const [isLoading, setIsLoading] = useRecoilState(scheduledIsLoadingAtom);
    // const [query, setQuery] = useRecoilState(scheduledQueryAtom);
    const [scheduledSubscriptions, setResult] = useRecoilState(scheduledListAtom);

    const fetch = (organizationId: number) => {
        setIsLoading((_isLoading) => {
            if (_isLoading) return true;

            new Promise((resolve, reject) => {
                scordiSubscriptionApi
                    .scheduledItems(organizationId)
                    .then((res) => {
                        setResult(res.data);
                        resolve(res.data);
                    })
                    .finally(() => setIsLoading(false));
            });

            return true;
        });
    };

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        fetch(orgId);
    }, [orgId]);

    if (!scheduledSubscriptions.length) return <></>;

    return (
        <div className={`pt-4 ${isLoading ? 'no-click opacity-30' : ''}`}>
            <p className="text-12 font-semibold mb-1.5">{t('payment.nextPlan')}</p>
            <div className="grid grid-cols-1 gap-2">
                {scheduledSubscriptions.map((scheduledSubscription, i) => (
                    <OrgScheduledSubscriptionItem key={i} scordiSubscription={scheduledSubscription} />
                ))}
            </div>
        </div>
    );
});
OrgScheduledSubscriptionList.displayName = 'OrgScheduledSubscriptionList';
