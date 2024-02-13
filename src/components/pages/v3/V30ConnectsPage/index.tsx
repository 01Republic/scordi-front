import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {ReactComponentLike} from 'prop-types';
import {googleOAuth} from '^config/environments';
import {useOnResize2} from '^components/util/onResize2';
import {V3ListPageLayout} from '^v3/layouts/V3ListPageLayout';
import {LNBIndex} from '^v3/share/LeftNavBar';
import {ConnectsPageTitle} from '^v3/V30ConnectsPage/ConnectsPageTitle';
import {DatasourceListSection} from '^v3/V30ConnectsPage/DatasourceListSection';
import {NewInvoiceAccountModalInConnects} from '^v3/V30ConnectsPage/_localModals/NewInvoiceAccountModal';
import {isWorkspaceConnectLoadingAtom} from '^v3/V30ConnectsPage/atom';
import {LoadingProgress} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/LoadingProgress';

const MODALS: ReactComponentLike[] = [
    NewInvoiceAccountModalInConnects, // 새로운 인보이스 계정 추가 모달
];

export const V3OrgConnectsPage = memo(() => {
    const {isDesktop} = useOnResize2();
    const isLoading = useRecoilValue(isWorkspaceConnectLoadingAtom);

    if (isLoading) return <LoadingProgress />;

    if (isDesktop) {
        return (
            <V3ListPageLayout activeTabIndex={LNBIndex.Connects} modals={MODALS}>
                <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
                    <ConnectsPageTitle />
                    <DatasourceListSection />
                </GoogleOAuthProvider>
            </V3ListPageLayout>
        );
    } else {
        return <></>;
    }
});
