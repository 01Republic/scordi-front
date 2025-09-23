import {memo} from 'react';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {ListPageTitle} from '^admin/billing/_common/ListPageTitle';

export const AdminScordiPaymentListPage = memo(function AdminScordiPaymentListPage() {
    return (
        <AdminListPageLayout
            title={<ListPageTitle currentSubject="scordi-payments" />}
            breadcrumbs={[{text: '스코디 빌링관리'}, {text: '결제 내역'}]}
        >
            <AdminPageContainer>AdminScordiPaymentListPage</AdminPageContainer>
        </AdminListPageLayout>
    );
});
