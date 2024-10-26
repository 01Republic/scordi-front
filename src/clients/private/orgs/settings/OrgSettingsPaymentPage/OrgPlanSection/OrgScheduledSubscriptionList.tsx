import React, {memo, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {
    scordiSubscriptionIsScheduledListLoadingAtom as scheduledIsLoadingAtom,
    scordiSubscriptionIsScheduledListQueryAtom as scheduledQueryAtom,
    scordiSubscriptionScheduledListAtom as scheduledListAtom,
} from '^models/_scordi/ScordiSubscription/atom';
import {scordiSubscriptionApi} from '^models/_scordi/ScordiSubscription/api';
import {OrgScheduledSubscriptionItem} from './OrgScheduledSubscriptionItem';

interface OrgScheduledSubscriptionListProps {
    orgId: number;
}

export const OrgScheduledSubscriptionList = memo((props: OrgScheduledSubscriptionListProps) => {
    const {orgId} = props;
    const [isLoading, setIsLoading] = useRecoilState(scheduledIsLoadingAtom);
    // const [query, setQuery] = useRecoilState(scheduledQueryAtom);
    const [result, setResult] = useRecoilState(scheduledListAtom);

    const fetch = () => {
        if (!orgId || isNaN(orgId)) return;

        setIsLoading((_isLoading) => {
            if (_isLoading) return true;

            new Promise((resolve, reject) => {
                scordiSubscriptionApi
                    .scheduledItems(orgId)
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
        fetch();
    }, [orgId]);

    if (!result.length) return <></>;

    return (
        <div className={`pt-4 ${isLoading ? 'no-click opacity-30' : ''}`}>
            <p className="text-12 font-semibold mb-1.5">다음으로 변경 예정</p>
            <div className="grid grid-cols-1 gap-2">
                {result.map((item, i) => (
                    <OrgScheduledSubscriptionItem key={i} scordiSubscription={item} />
                ))}
            </div>
        </div>
    );
});
OrgScheduledSubscriptionList.displayName = 'OrgScheduledSubscriptionList';
