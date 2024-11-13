import React, {memo} from 'react';
import {googleOAuth} from '^config/environments';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {useSetRecoilState} from 'recoil';
import {connectInvoiceAccountCodeAtom} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountBeforeLoad/atom';
import {connectGoogleWorkspaceCodeAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/TeamMemberSelect/atom';

export const GoogleLogin = memo(function GoogleLogin() {
    const setGmailAuthCode = useSetRecoilState(connectInvoiceAccountCodeAtom);
    const setGsuiteAuthCode = useSetRecoilState(connectGoogleWorkspaceCodeAtom);
    return (
        <>
            <GoogleOAuthProvider clientId={googleOAuth.gmailClient.id}>
                <GoogleLoginBtn
                    about="gmail"
                    className="fixed -top-full hidden"
                    onCode={(code) => setGmailAuthCode(code)}
                />
            </GoogleOAuthProvider>
            <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
                <GoogleLoginBtn
                    about="admin"
                    className="fixed -top-full hidden"
                    onCode={(code) => setGsuiteAuthCode(code)}
                />
            </GoogleOAuthProvider>
        </>
    );
});
