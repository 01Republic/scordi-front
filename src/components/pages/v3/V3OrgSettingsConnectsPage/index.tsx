import React, {memo} from 'react';
import {V3SettingsLayout} from '^v3/layouts/V3SettingsLayout';
import {SettingBodyPanel} from '^v3/share/SettingBodyPanel';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {googleOAuth} from '^config/environments';
import {WorkspaceSection} from '^v3/V3OrgSettingsConnectsPage/WorkspaceSection';
import {InvoiceAccountSection} from '^v3/V3OrgSettingsConnectsPage/InvoiceAccountSection';

export const V3OrgSettingsConnectsPage = memo(() => {
    return (
        <V3SettingsLayout>
            <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
                <SettingBodyPanel title="연동관리">
                    {/*워크스페이스*/}
                    <WorkspaceSection />

                    <div className="divider my-8" />

                    {/*인보이스 수신 계정*/}
                    <InvoiceAccountSection />
                </SettingBodyPanel>
            </GoogleOAuthProvider>
        </V3SettingsLayout>
    );
});
