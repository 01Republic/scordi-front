import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useCurrentOrg} from '^models/Organization/hook';
import {OrgOnboardingNotificationsPage} from '^clients/private/orgs/onboarding/OrgOnboardingSlackPage';

export const OrgOnboardingNotificationsPageRoute = pathRoute({
    pathname: '/orgs/[id]/onboarding/notifications',
    path: (orgId: number) => pathReplace(OrgOnboardingNotificationsPageRoute.pathname, {id: orgId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
        ])),
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgOnboardingNotificationsPage />;
}
