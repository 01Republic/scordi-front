import React, {memo} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import {useSetRecoilState} from 'recoil';
import {useGoogleLoginSuccessHandler2} from '^hooks/useGoogleLoginSuccessHandler2';
import {googleAccessTokenAtom} from '^components/pages/UsersLogin/atom';
import {userSocialGoogleApi} from '^api/social-google.api';

interface GoogleLoginBtnProps {
    googleLoginOnSuccessFn?: (accessToken: string) => Promise<void> | void;
    scope?: string[];
}

export const GoogleLoginBtn = memo((props: GoogleLoginBtnProps) => {
    const {googleLoginOnSuccessFn} = props;
    const googleLoginOnSuccess = googleLoginOnSuccessFn ? googleLoginOnSuccessFn : useGoogleLoginSuccessHandler2();
    const setAccessToken = useSetRecoilState(googleAccessTokenAtom);

    const allInOneScope = [
        'email',
        'profile',
        'openid',
        'https://www.googleapis.com/auth/gmail.readonly', // 인보이스
        'https://www.googleapis.com/auth/admin.reports.audit.readonly', // 토큰 사용량
        'https://www.googleapis.com/auth/admin.directory.user', // 워크스페이스 유저 목록
        'https://www.googleapis.com/auth/admin.directory.orgunit', // 워크스페이스 조직 정보
    ];

    const scope = props.scope ?? allInOneScope;

    const getFeature = () => {
        return scope.find((i) => i.includes('gmail'))
            ? 'gmail'
            : scope.find((i) => i.includes('admin'))
            ? 'admin'
            : scope.find((i) => i.includes('gmail') && i.includes('admin')) && undefined;
    };

    const loginButtonOnClick = useGoogleLogin({
        onSuccess: async (response) => {
            const feature = getFeature();
            const {code} = response;
            const {accessToken} = await userSocialGoogleApi.token({
                code,
                ...(feature ? {feature} : {}),
            });
            setAccessToken(accessToken);
            return googleLoginOnSuccess(accessToken);
        },
        scope: scope.join(' '),
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
