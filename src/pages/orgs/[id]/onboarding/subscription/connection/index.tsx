import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useCurrentOrg} from '^models/Organization/hook';
import {v3CommonRequires} from '^types/utils/18n.type';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {OrgSubscriptionConnectionPage} from '^clients/private/orgs/onboarding/OrgOnboardingSubscriptionPage/SubscriptionConnectionPage';

export const OrgOnboardingSubscriptionConnectionPageRoute = pathRoute({
    pathname: '/orgs/[id]/onboarding/subscription/connection',
    path: (orgId: number) => pathReplace(OrgOnboardingSubscriptionConnectionPageRoute.pathname, {id: orgId}),
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
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgSubscriptionConnectionPage />;
}
