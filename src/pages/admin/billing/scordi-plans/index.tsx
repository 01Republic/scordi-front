import React from 'react';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {AdminScordiPlanListPage} from '^admin/billing/scordi-plans/AdminScordiPlanListPage';

export const AdminScordiPlanListPageRoute = pathRoute({
    pathname: '/admin/billing/scordi-plans',
    path: () => pathReplace(AdminScordiPlanListPageRoute.pathname, {}),
});

/**
 * 관리자용 Scordi 플랜 목록 페이지를 렌더링하는 최상위 페이지 컴포넌트입니다.
 *
 * AdminScordiPlanListPage를 그대로 반환하며 추가 props나 클라이언트 로직이 없습니다.
 */
export default function Page() {
    return <AdminScordiPlanListPage />;
}
