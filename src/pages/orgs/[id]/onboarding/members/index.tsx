import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {OrgOnboardingMembersPage} from '^clients/private/orgs/onboarding/OrgOnboardingMembersPage';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

// 온보딩 스텝2. / 구글워크스페이스 연동 / 커버 페이지
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
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgOnboardingMembersPage />;
}
