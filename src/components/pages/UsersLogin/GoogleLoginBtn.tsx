import React, {memo, useEffect} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import {useGoogleLoginSuccessHandler} from '^hooks/useGoogleLoginSuccessHandler';
import {useGoogleAccessTokenCallback} from '^hooks/useGoogleAccessToken';
import {useRecoilValue} from 'recoil';
import {GmailAgent, GoogleAccessTokenData, googleAuthForGmail} from '^api/tasting.api';
import {UserLoginPageRoute} from '^pages/users/login';
import {invitedOrgIdAtom} from '^v3/V3OrgJoin/atom';
import {getCreateInvoiceAccountFromTo} from '^types/invoiceAccount.type';

export const GoogleLoginBtn = memo(() => {
    const googleLoginOnSuccess = useGoogleLoginSuccessHandler();
    const {accessTokenData} = useGoogleAccessTokenCallback(UserLoginPageRoute.url());

    useEffect(() => {
        if (!accessTokenData) return;

        googleLoginOnSuccess(accessTokenData.access_token);
    }, [accessTokenData]);

    //   const loginButtonOnClick = useGoogleLogin({
    //     onSuccess: async (response) => {
    //         setAccessTokenData(response)
    //         await googleLoginOnSuccess(response.access_token);
    //     },
    //     scope: 'email profile openid https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    //     onError: (error) => {
    //         console.log(error);
    //     },
    // });

    return (
        <button
            onClick={() => googleAuthForGmail()}
            className="btn btn-lg btn-outline shadow font-medium normal-case mb-3 space-x-4 bg-white border-slate-200 text-slate-700 hover:bg-white hover:border-primary hover:text-slate-700 focus:bg-blue-50 active:bg-primary-100"
        >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
            <span>Continue with Google</span>
        </button>
    );
});
