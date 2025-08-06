import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {OrgReviewCampaignListPage} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignListPage';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const OrgReviewCampaignListPageRoute = pathRoute({
    pathname: '/orgs/[id]/reviewCampaigns',
    path: (orgId: number) => pathReplace(OrgReviewCampaignListPageRoute.pathname, {id: orgId}),
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
            'reviewCampaigns',
        ])),
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgReviewCampaignListPage />;
}
