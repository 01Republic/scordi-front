import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {CompleteSubscriptionConnectionPage} from '^clients/private/orgs/onboarding/OrgOnboardingSubscriptionPage/CompleteSubscriptionConnectionPage';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const OrgOnboardingSubscriptionConnectionCompletePageRoute = pathRoute({
    pathname: '/orgs/[id]/onboarding/subscription/connection/complete',
    path: (orgId: number) => pathReplace(OrgOnboardingSubscriptionConnectionCompletePageRoute.pathname, {id: orgId}),
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

    return <CompleteSubscriptionConnectionPage />;
}
