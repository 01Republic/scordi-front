import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {V3OrgCardDetailPage} from '^components/pages/v3/V3OrgCardDetailPage';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const V3OrgCardDetailPageRoute = pathRoute({
    pathname: '/v3/orgs/[orgId]/cards/[cardId]',
    path: (orgId: number, cardId: number) => pathReplace(V3OrgCardDetailPageRoute.pathname, {orgId, cardId}),
});

// export const getStaticPaths = async () => ({
//     paths: [{params: {orgId: '1', cardId: '1'}}],
//     fallback: true,
// });

// export const getStaticProps = async ({locale}: any) => ({
//     props: {
//         // Will be passed to the page component as props
//         ...(await serverSideTranslations(locale, [
//             ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
//             'org-home',
//             'google-compliance',
//             'publicTasting',
//         ])),
//     },
// });

export default function Page() {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const cardId = useRouterIdParamState('cardId', cardIdParamState);

    // TODO: [to.진경님] 아래에 cardId 가 있으면 빈페이지를 리턴하게 되어있는데 의도하신건가요???
    //  if (!orgId || !cardId) return <></>; 처럼 되는게 맞을 것 같아서요!
    //  if (!orgId || isNaN(!orgId) || !cardId || isNaN(cardId)) return <></>; 이게 정확히 체크한 버전 같구욥 ㅎㅎ
    //  이게 getStaticPaths 빌드 싶패와 관련이 있지는 않았을지 조심스럽게 예상해봅니다!!
    if (!orgId && cardId) return <></>;

    return <V3OrgCardDetailPage />;
}
