import React, {memo} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import {useSetRecoilState} from 'recoil';
import {useGoogleLoginSuccessHandler2} from '^hooks/useGoogleLoginSuccessHandler2';
import {googleAccessTokenAtom} from '^components/pages/UsersLogin/atom';
import {userSocialGoogleApi} from '^api/social-google.api';

interface GoogleLoginBtnProps {
    googleLoginOnSuccessFn?: (accessToken: string) => Promise<void> | void;
    scope?: 'string';
}

export const GoogleLoginBtn = memo((props: GoogleLoginBtnProps) => {
    const {googleLoginOnSuccessFn, scope} = props;
    const googleLoginOnSuccess = googleLoginOnSuccessFn ? googleLoginOnSuccessFn : useGoogleLoginSuccessHandler2();
    const setAccessToken = useSetRecoilState(googleAccessTokenAtom);

    // const {accessTokenData} = useGoogleAccessTokenCallback(UserLoginPageRoute.url());
    //
    // useEffect(() => {
    //     if (!accessTokenData) return;
    //
    //     googleLoginOnSuccess(accessTokenData.access_token);
    // }, [accessTokenData]);

    const loginButtonOnClick = useGoogleLogin({
        onSuccess: async (response) => {
            // setAccessTokenData(response)
            // await googleLoginOnSuccess(response.access_token);
            const {code, scope, state} = response;
            const {accessToken} = await userSocialGoogleApi.token(code);
            setAccessToken(accessToken);
            return googleLoginOnSuccess(accessToken);
        },
        scope: 'email profile openid https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/admin.reports.audit.readonly https://www.googleapis.com/auth/admin.reports.usage.readonly',
        flow: 'auth-code',
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <button
            onClick={() => loginButtonOnClick()}
            className="btn btn-lg btn-outline shadow font-medium normal-case mb-3 space-x-4 bg-white border-slate-200 text-slate-700 hover:bg-white hover:border-primary hover:text-slate-700 focus:bg-blue-50 active:bg-primary-100"
        >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
            <span>Continue with Google</span>
        </button>
    );
});
