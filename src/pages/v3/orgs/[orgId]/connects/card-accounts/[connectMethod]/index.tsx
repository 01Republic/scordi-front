import React from 'react';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';

export const V3OrgConnectDetailPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/connects/card-accounts/[connectMethod]',
    path: (orgId: number, connectMethod: string) =>
        pathReplace(V3OrgConnectDetailPageRoute.pathname, {
            orgId,
            connectMethod,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1', connectMethod: '현대카드'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires,
            'org-home',
            'google-compliance',
            // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.'org-home'
        ])),
    },
});

export default function V3OrgConnectDetailPage() {
    const router = useRouter();
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    useCurrentOrg(orgId);
    if (!orgId || isNaN(orgId)) return <></>;

    return (
        <div>
            <div>
                <p>V3OrgConnectDetailPage</p>
            </div>
        </div>
    );
}
