import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {OrgOnboardingCompletePage} from '^clients/private/orgs/onboarding/OrgOnboardingCompletePage';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const OrgOnboardingCompletePageRoute = pathRoute({
    pathname: '/orgs/[id]/onboarding/complete',
    path: (orgId: number) => pathReplace(OrgOnboardingCompletePageRoute.pathname, {id: orgId}),
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

    return <OrgOnboardingCompletePage />;
}
