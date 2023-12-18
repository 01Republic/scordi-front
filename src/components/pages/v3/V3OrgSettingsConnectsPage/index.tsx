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

export const V3OrgSettingsConnectsPage = memo(() => {
    const isLoaded = useRecoilValue(gmailItemsLoadedAtom);

    if (isLoaded) return <LoadingProgressFullScreen />;

    return (
        <V3SettingsLayout>
            <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
                {/*워크스페이스*/}
                <WorkspaceSection />

                {/*인보이스 수신 계정*/}
                <InvoiceAccountSection />
            </GoogleOAuthProvider>
            <NewInvoiceAccountModal />
        </V3SettingsLayout>
    );
});