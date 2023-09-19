import React from 'react';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';

export const V3OrgBillingHistoryDetailPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/billingHistories/[id]',
    path: (orgId: number, id: number) =>
        pathReplace(V3OrgBillingHistoryDetailPageRoute.pathname, {
            orgId,
            id,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1', id: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.'org-home'
        ])),
    },
});

export default function V3OrgBillingHistoryDetailPage() {
    const router = useRouter();

    return (
        <div>
            <div>
                <p>V3OrgBillingHistoryDetailPage</p>
            </div>
        </div>
    );
}
