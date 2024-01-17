import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {googleOAuth} from '^config/environments';
import {WorkspaceSection} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection';
import {InvoiceAccountSection} from '^v3/V3OrgSettingsConnectsPage/InvoiceAccountSection';
import {NewInvoiceAccountModal} from 'src/components/pages/v3/share/modals/NewInvoiceAccountModal';
import {useRecoilValue} from 'recoil';
import {gmailItemsLoadedAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {LoadingProgressFullScreen} from '^components/pages/LandingPages/TastingPage';
import {ConnectStatus} from '^v3/V3OrgSettingsPage/desktop/atom';
import {useRouter} from 'next/router';
import {NewInvoiceAccountModalInSettings} from '^v3/V3OrgSettingsConnectsPage/_localModals/NewInvoiceAccountModalInSettings';

export const V3OrgSettingsConnectsPage = memo(() => {
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);
    const router = useRouter();
    const query = router.query.menu?.toString();

    if (isLoaded) return <LoadingProgressFullScreen />;

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
