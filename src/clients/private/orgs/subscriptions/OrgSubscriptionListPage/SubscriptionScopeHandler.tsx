import {memo, useState} from 'react';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {SubscriptionUsingStatus, t_SubscriptionUsingStatus} from '^models/Subscription/types';

export const SubscriptionScopeHandler = memo(function () {
    const {query, search} = useSubscriptionTableListAtom();
    const [activeStatus, setActiveUsingStatus] = useState<SubscriptionUsingStatus>();

    const searchResource = (usingStatus?: SubscriptionUsingStatus) => {
        if (usingStatus === activeStatus) return;
        setActiveUsingStatus(usingStatus);
        search({...query, usingStatus, page: 1});
    };

    return (
        <div className="flex items-center gap-2">
            <ListPage.ScopeButton active={activeStatus === undefined} onClick={() => searchResource()}>
                전체
            </ListPage.ScopeButton>
            {[
                SubscriptionUsingStatus.NONE,
                SubscriptionUsingStatus.FREE,
                SubscriptionUsingStatus.PAID,
                SubscriptionUsingStatus.QUIT,
            ].map((usingStatus, i) => (
                <ListPage.ScopeButton
                    key={i}
                    active={activeStatus === usingStatus}
                    onClick={() => searchResource(usingStatus)}
                >
                    {t_SubscriptionUsingStatus(usingStatus)}
                </ListPage.ScopeButton>
            ))}
        </div>
    );
});
