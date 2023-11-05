import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {V3OrgCardShowPage} from '^components/pages/v3/V3OrgCardShowPage';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const V3OrgCardShowPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/cards',
    path: (orgId: number) =>
        pathReplace(V3OrgCardShowPageRoute.pathname, {
            orgId,
        }),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
            'org-home',
            'google-compliance',
            'publicTasting',
        ])),
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    if (!orgId) return <></>;

    return <V3OrgCardShowPage />;
}
