import {orgIdParamState, reviewUncategorizedIdParamState, useRouterIdParamState} from '^atoms/common';
import {ReviewUncategorizedDetailPage} from '^clients/private/orgs/reviewUncategorized/ReviewUncategorizedDetailPage';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const OrgReviewUncategoriedDetailPageRoute = pathRoute({
    pathname: '/orgs/[id]/reviewUncategorized/[reviewUncategorizedId]',
    path: (orgId: number, reviewUncategorizedId: number) =>
        pathReplace(OrgReviewUncategoriedDetailPageRoute.pathname, {id: orgId, reviewUncategorizedId}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '1', reviewUncategorizedId: '1'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...v3CommonRequires])),
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const reviewUncategorizedId = useRouterIdParamState('reviewUncategorizedId', reviewUncategorizedIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId) || !reviewUncategorizedId || isNaN(reviewUncategorizedId)) return <></>;

    return <ReviewUncategorizedDetailPage />;
}
