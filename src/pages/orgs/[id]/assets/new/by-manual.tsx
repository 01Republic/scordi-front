import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {OrgAssetCreateByManualPage} from '^clients/private/orgs/assets/create-steps';
import {useCurrentOrg} from '^models/Organization/hook';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

export const OrgAssetsCreateByManualPageRoute = pathRoute({
    pathname: '/orgs/[id]/assets/new/by-manual',
    path: (orgId: number) => pathReplace(OrgAssetsCreateByManualPageRoute.pathname, {id: orgId}),
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

    return <OrgAssetCreateByManualPage />;
}
