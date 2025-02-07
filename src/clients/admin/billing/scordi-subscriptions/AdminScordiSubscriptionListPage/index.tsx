import {memo} from 'react';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {useAdminScordiSubscriptions} from '^models/_scordi/ScordiSubscription/hook/useAdminScordiSubscriptions';

export const AdminScordiSubscriptionListPage = memo(function AdminScordiSubscriptionListPage() {
    const {data} = useAdminScordiSubscriptions({
        relations: ['organization'],
        order: {id: 'DESC'},
    });

    const {items, pagination} = data;

    return (
        <AdminListPageLayout title="구독 내역" breadcrumbs={[{text: '스코디 빌링관리'}, {text: '구독 내역'}]}>
            <AdminPageContainer>
                {items.map((item, i) => {
                    return (
                        <div key={i} className="grid grid-cols-4">
                            <div>#{item.id}</div>
                            <div>
                                (#{item.organizationId}) {item.organization?.name}
                            </div>
                            <div>{item.scordiPlan.name}</div>
                            <div></div>
                        </div>
                    );
                })}
            </AdminPageContainer>
        </AdminListPageLayout>
    );
});
