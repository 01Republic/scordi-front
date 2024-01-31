import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {googleOAuth} from '^config/environments';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {ConnectStatus} from '^v3/V3OrgSettingsPage/desktop/atom';
import {isWorkspaceConnectLoadingAtom} from '^v3/V3OrgSettingsConnectsPage/atom';
import {WorkspaceSection} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection';
import {InvoiceAccountSection} from '^v3/V3OrgSettingsConnectsPage/InvoiceAccountSection';
import {NewInvoiceAccountModalInSettings} from '^v3/V3OrgSettingsConnectsPage/_localModals/NewInvoiceAccountModalInSettings';
import {LoadingProgress} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection/LoadingProgress';

export const V3OrgSettingsConnectsPage = memo(() => {
    const isLoaded = useRecoilValue(isWorkspaceConnectLoadingAtom);
    const router = useRouter();
    const query = router.query.menu?.toString();

    if (isLoaded) return <LoadingProgress />;

    return (
        <V3SettingsLayout>
            <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
                {query === ConnectStatus.Workspace && <WorkspaceSection />}
                {query === ConnectStatus.InvoiceEmail && <InvoiceAccountSection />}
            </GoogleOAuthProvider>
            <NewInvoiceAccountModalInSettings />
        </V3SettingsLayout>
    );
});
