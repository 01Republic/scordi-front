import {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {SubscriptionManager} from '^models/Subscription';
import {subscriptionApi} from '^api/subscription.api';
import {CardTablePanel} from '^admin/share';
import {SubscriptionItem} from '^admin/orgs/AdminOrgDetailPage/tabContents/SubscriptionListTabContent/SubscriptionItem';

export const SubscriptionListTabContent = memo(() => {
    const org = useRecoilValue(adminOrgDetail);
    const [Subscription, setManager] = useState<SubscriptionManager>();

    useEffect(() => {
        if (!org) return;

        const req = subscriptionApi.index({
            relations: ['product', 'invoiceAccount'],
            where: {organizationId: org.id},
            order: {id: 'DESC'},
            itemsPerPage: 0,
        });

        req.then((res) => {
            setManager(SubscriptionManager.init(res.data.items));
        });
    }, [org]);

    if (!org) return <></>;
    if (!Subscription) return <>loading...</>;

    return (
        <div className="w-full">
            <h2 className="mb-6">
                {Subscription.length}
                <small>개의 구독이 등록되어 있습니다.</small>
            </h2>

            <CardTablePanel
                gridClass="grid-cols-7"
                entries={Subscription.all()}
                ths={['name', 'billing', '인보이스 계정', '', 'created at', 'updated at', '']}
                entryComponent={(subscription, i, arr) => (
                    <SubscriptionItem subscription={subscription} borderBottom={i + 1 < arr.length} />
                )}
            />
        </div>
    );
});
