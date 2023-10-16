import {V3OrgJoin} from '^components/pages/v3/V3OrgJoin';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const V3OrgJoinPageRoute = pathRoute({
    pathname: 'v3/orgs/[orgId]/join',
    path: (orgId: number) => pathReplace(V3OrgJoinPageRoute.pathname, {orgId}),
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

export default function V3OrgJoinPage() {
    return <V3OrgJoin />;
}
