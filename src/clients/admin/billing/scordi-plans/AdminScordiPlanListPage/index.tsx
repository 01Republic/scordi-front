import {memo} from 'react';
import {AdminListPageLayout, AdminPageContainer} from '^admin/layouts';
import {ListPageTitle} from '^admin/billing/_common/ListPageTitle';

export const AdminScordiPlanListPage = memo(function AdminScordiPlanListPage() {
    return (
        <AdminListPageLayout
            title={<ListPageTitle currentSubject="scordi-plans" />}
            breadcrumbs={[{text: '스코디 빌링관리'}, {text: '플랜 관리'}]}
        >
            <AdminPageContainer></AdminPageContainer>
        </AdminListPageLayout>
    );
});
