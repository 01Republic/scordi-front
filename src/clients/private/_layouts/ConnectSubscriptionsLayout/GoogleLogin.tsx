import React, {memo} from 'react';
import {googleOAuth} from '^config/environments';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {useSetRecoilState} from 'recoil';
import {connectInvoiceAccountCodeAtom} from '^v3/share/OnboardingFlow/steps/ConnectInvoiceAccountBeforeLoad/atom';

export const GoogleLogin = memo(function GoogleLogin() {
    const setCode = useSetRecoilState(connectInvoiceAccountCodeAtom);
    return (
        <GoogleOAuthProvider clientId={googleOAuth.gmailClient.id}>
            <GoogleLoginBtn about="gmail" className="fixed -top-full" onCode={(code) => setCode(code)} />
        </GoogleOAuthProvider>
    );
});
