import React, {memo} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import {useGoogleLoginSuccessHandler} from '^hooks/useGoogleLoginSuccessHandler';

export const GoogleLoginBtn = memo(() => {
    const googleLoginOnSuccess = useGoogleLoginSuccessHandler();

    const loginButtonOnClick = useGoogleLogin({
        onSuccess: async (response) => {
            await googleLoginOnSuccess(response.access_token);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <button
            onClick={() => loginButtonOnClick()}
            className="btn btn-block btn-lg btn-outline shadow font-medium normal-case mb-3 space-x-4 bg-white border-slate-200 text-slate-700 hover:bg-white hover:border-primary hover:text-slate-700 focus:bg-blue-50 active:bg-primary-100"
        >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-6 h-6" alt="" />
            <span>Continue with Google</span>
        </button>
    );
});
