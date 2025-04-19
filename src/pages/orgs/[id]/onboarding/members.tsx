import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {OrgOnboardingMembersPage} from '^clients/private/orgs/onboarding/OrgOnboardingMembersPage';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const OrgOnboardingMembersPageRoute = pathRoute({
    pathname: '/orgs/[id]/onboarding/members',
    path: (orgId: number) => pathReplace(OrgOnboardingMembersPageRoute.pathname, {id: orgId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...v3CommonRequires])),
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgOnboardingMembersPage />;
}
