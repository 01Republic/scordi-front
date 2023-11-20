import React from 'react';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {V3OrgAccountListPage} from '^v3/V3OrgAccountListPage';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';

export const V3OrgAccountListPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/accounts',
    path: (orgId: number) => pathReplace(V3OrgAccountListPageRoute.pathname, {orgId}),
});

// export const getStaticPaths = async () => ({
//     paths: [{params: {orgId: '1'}}],
//     fallback: true,
// });
//
// export const getStaticProps = async ({locale}: any) => ({
//     props: {
//         // Will be passed to the page component as props
//         ...(await serverSideTranslations(locale, [
//             ...v3CommonRequires,
//             'org-home',
//             // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
//         ])),
//     },
// });

export default function Page() {
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <V3OrgAccountListPage />;
}
