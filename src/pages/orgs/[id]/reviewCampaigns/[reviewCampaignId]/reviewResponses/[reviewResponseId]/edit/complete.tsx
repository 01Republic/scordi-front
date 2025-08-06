import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {ReviewResponseCompletePage} from '^clients/private/orgs/reviewCampaigns/OrgReviewResponseCompletePage';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const OrgReviewResponseCompletePageRoute = pathRoute({
    pathname: '/orgs/[id]/reviewCampaigns/[reviewCampaignId]/reviewResponses/[reviewResponseId]/edit/complete',
    path: (orgId: number, reviewCampaignId: number, reviewResponseId: number) =>
        pathReplace(OrgReviewResponseCompletePageRoute.pathname, {id: orgId, reviewCampaignId, reviewResponseId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1', reviewCampaignId: '1', reviewResponseId: '1'}}],
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

    if (!orgId || isNaN(orgId)) return <></>;

    return <ReviewResponseCompletePage />;
}
