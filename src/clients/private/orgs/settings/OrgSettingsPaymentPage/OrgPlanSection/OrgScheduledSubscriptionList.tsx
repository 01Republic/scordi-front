import React, {memo, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {
    scordiSubscriptionIsScheduledListLoadingAtom as scheduledIsLoadingAtom,
    scordiSubscriptionIsScheduledListQueryAtom as scheduledQueryAtom,
    scordiSubscriptionScheduledListAtom as scheduledListAtom,
} from '^models/_scordi/ScordiSubscription/atom';
import {scordiSubscriptionApi} from '^models/_scordi/ScordiSubscription/api';
import {OrgScheduledSubscriptionItem} from './OrgScheduledSubscriptionItem';
import {useScheduledScordiSubscriptions} from '^models/_scordi/ScordiSubscription/hook';

interface OrgScheduledSubscriptionListProps {
    orgId: number;
}

export const OrgScheduledSubscriptionList = memo((props: OrgScheduledSubscriptionListProps) => {
    const {orgId} = props;
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
            <p className="text-12 font-semibold mb-1.5">다음 플랜</p>
            <div className="grid grid-cols-1 gap-2">
                {scheduledSubscriptions.map((scheduledSubscription, i) => (
                    <OrgScheduledSubscriptionItem key={i} scordiSubscription={scheduledSubscription} />
                ))}
            </div>
        </div>
    );
});
OrgScheduledSubscriptionList.displayName = 'OrgScheduledSubscriptionList';
