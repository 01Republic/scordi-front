import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {V3OrgCardDetailPage} from '^components/pages/v3/V3OrgCardDetailPage';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {cardIdParamState} from '^models/CreditCard/atom';
import {useSetRecoilState} from 'recoil';
import {useEffect} from 'react';
import {useRouter} from 'next/router';

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

    const setCardId = useSetRecoilState(cardIdParamState);
    const router = useRouter();
    const cardId = Number(router.query.cardId);

    useEffect(() => {
        cardId && setCardId(cardId);
    }, [cardId]);

    if (!orgId || isNaN(orgId) || !cardId || isNaN(cardId)) return <></>;

    return <V3OrgCardDetailPage />;
}
