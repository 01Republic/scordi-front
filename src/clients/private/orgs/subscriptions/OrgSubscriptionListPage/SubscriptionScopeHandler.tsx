import {useState} from 'react';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {
    FindAllSubscriptionsQuery,
    SubscriptionUsingStatus,
    t_SubscriptionUsingStatus,
} from '^models/Subscription/types';

interface Props {
    onSearch: (query: Partial<FindAllSubscriptionsQuery>) => any;
}

export function SubscriptionScopeHandler(props: Props) {
    const {onSearch} = props;
    const [activeStatus, setActiveUsingStatus] = useState<SubscriptionUsingStatus>();

    const searchResource = (usingStatus?: SubscriptionUsingStatus) => {
        if (usingStatus === activeStatus) return;
        setActiveUsingStatus(usingStatus);
        onSearch({usingStatus, page: 1});
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
}
