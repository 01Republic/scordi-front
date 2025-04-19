import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {OrgReviewCampaignNewPage} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignNewPage';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const OrgReviewCampaignNewPageRoute = pathRoute({
    pathname: '/orgs/[id]/reviewCampaigns/new',
    path: (orgId: number, query?: Record<string, string>) =>
        pathReplace(OrgReviewCampaignNewPageRoute.pathname, {id: orgId}, query),
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

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgReviewCampaignNewPage />;
}
