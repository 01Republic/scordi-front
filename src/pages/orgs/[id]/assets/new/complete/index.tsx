import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {OrgAssetCreateCompletePage} from '^clients/private/orgs/assets/create-steps';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

/** DEPRECATED PAGE (DO NOT USE!!) */
export const OrgAssetsCreateCompletePageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/new/complete',
    path: (orgId: number) => pathReplace(OrgAssetsCreateCompletePageRoute.pathname, {id: orgId}),
});

export const getServerSideProps = async ({locale}: any) => ({
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

    return <OrgAssetCreateCompletePage />;
}
