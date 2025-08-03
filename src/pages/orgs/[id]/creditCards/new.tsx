import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {OrgCreditCardNewPage} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardNewPage';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const OrgCreditCardNewPageRoute = pathRoute({
    pathname: '/orgs/[id]/creditCards/new',
    path: (orgId: number) => pathReplace(OrgCreditCardNewPageRoute.pathname, {id: orgId}),
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
            'assets',
        ])),
    },
});

export default function Page() {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    useCurrentOrg(orgId);

    if (!orgId || isNaN(orgId)) return <></>;

    return <OrgCreditCardNewPage />;
}
