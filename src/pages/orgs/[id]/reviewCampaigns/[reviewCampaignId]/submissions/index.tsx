import React from 'react';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useCurrentOrg} from '^models/Organization/hook';
import {OrgReviewCampaignDetailSubmissionsPage} from '^clients/private/orgs/reviewCampaigns/OrgReviewCampaignDetailPage/SubmissionsPage';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {v3CommonRequires} from '^types/utils/18n.type';

export const OrgReviewCampaignDetailSubmissionsPageRoute = pathRoute({
    pathname: '/orgs/[id]/reviewCampaigns/[reviewCampaignId]/submissions',
    path: (orgId: number, reviewCampaignId: number) =>
        pathReplace(OrgReviewCampaignDetailSubmissionsPageRoute.pathname, {id: orgId, reviewCampaignId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1', reviewCampaignId: '1'}}],
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

    return <OrgReviewCampaignDetailSubmissionsPage />;
}
