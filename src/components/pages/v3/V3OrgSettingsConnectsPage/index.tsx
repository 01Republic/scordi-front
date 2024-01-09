import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {googleOAuth} from '^config/environments';
import {WorkspaceSection} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection';
import {InvoiceAccountSection} from '^v3/V3OrgSettingsConnectsPage/InvoiceAccountSection';
import {NewInvoiceAccountModal} from '^v3/V3OrgHomePage/NewInvoiceAccountModal';
import {useRecoilValue} from 'recoil';
import {gmailItemsLoadedAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {LoadingProgressFullScreen} from '^components/pages/LandingPages/TastingPage';
import {ConnectStatus, SelectedSettingsItem} from '^v3/V3OrgSettingsPage/desktop/atom';

export const V3OrgSettingsConnectsPage = memo(() => {
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const selectedItem = useRecoilValue(SelectedSettingsItem);

    if (isLoaded) return <LoadingProgressFullScreen />;

    return (
        <V3SettingsLayout>
            <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
                {selectedItem === ConnectStatus.Workspace && <WorkspaceSection />}
                {selectedItem === ConnectStatus.InvoiceEmail && <InvoiceAccountSection />}
            </GoogleOAuthProvider>
            <NewInvoiceAccountModal />
        </V3SettingsLayout>
    );
});
