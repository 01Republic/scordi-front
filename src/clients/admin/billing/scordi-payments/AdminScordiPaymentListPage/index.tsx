import {memo} from 'react';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';

export const AdminScordiPaymentListPage = memo(function AdminScordiPaymentListPage() {
    return (
        <AdminListPageLayout title="결제 내역" breadcrumbs={[{text: '스코디 빌링관리'}, {text: '결제 내역'}]}>
            <AdminPageContainer>AdminScordiPaymentListPage</AdminPageContainer>
        </AdminListPageLayout>
    );
});
