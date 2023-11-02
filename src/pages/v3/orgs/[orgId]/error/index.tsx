import {V3InviteOrgError} from '^components/pages/v3/V3OrgJoin/InviteOrgError';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const V3OrgJoinErrorPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/error',
    path: (orgId: number) => pathReplace(V3OrgJoinErrorPageRoute.pathname, {orgId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {orgId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires,
            'org-home',
            'google-compliance',
            'publicTasting',
        ])),
        // Will be passed to the page component as props
    },
});

export default function V3OrgJoinErrorPage() {
    return <V3InviteOrgError />;
}
