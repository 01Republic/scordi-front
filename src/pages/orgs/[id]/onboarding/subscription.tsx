import { orgIdParamState, useRouterIdParamState } from '^atoms/common';
import { OrgOnboardingSubscriptionPage } from '^clients/private/orgs/onboarding/OrgOnboardingSubscriptionPage';
import { useCurrentOrg } from '^models/Organization/hook';
import { pathReplace, pathRoute } from '^types/pageRoute.type';
import { v3CommonRequires } from '^types/utils/18n.type';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const OrgOnboardingSubscriptionPageRoute = pathRoute({
    pathname: '/orgs/[id]/onboarding/subscription',
    path: (orgId: number) => pathReplace(OrgOnboardingSubscriptionPageRoute.pathname, { id: orgId }),
});

export const getStaticPaths = async () => ({
    paths: [{ params: { id: '1' } }],
    fallback: true,
});

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires,
        ])),
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgOnboardingSubscriptionPage />;
}
