import React, {memo} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import {useSetRecoilState} from 'recoil';
import {useGoogleLoginSuccessHandler2} from '^hooks/useGoogleLoginSuccessHandler2';
import {googleAccessTokenAtom} from '^components/pages/UsersLogin/atom';
import {userSocialGoogleApi} from '^api/social-google.api';
import {uniq} from '^utils/array';
import {ReactNodeLike} from 'prop-types';

const SCOPE_MAP = {
    login: ['email', 'profile', 'openid'],
    gmail: [
        'email',
        'profile',
        'openid',
        'https://www.googleapis.com/auth/gmail.readonly', // 인보이스
    ],
    admin: [
        'email',
        'profile',
        'openid',
        'https://www.googleapis.com/auth/admin.reports.audit.readonly', // 토큰 사용량
        'https://www.googleapis.com/auth/admin.directory.user', // 워크스페이스 유저 목록
        'https://www.googleapis.com/auth/admin.directory.user.security',
        'https://www.googleapis.com/auth/admin.directory.orgunit', // 워크스페이스 조직 정보
    ],
};
const SCOPE_ALL = uniq(Object.values(SCOPE_MAP).flatMap((arr) => arr));

interface GoogleLoginBtnProps {
    onCode?: (code: string) => void;
    googleLoginOnSuccessFn?: (accessToken: string) => Promise<void> | void;
    about?: keyof typeof SCOPE_MAP;
    className?: string;
    logoSize?: string;
    ButtonComponent?: () => JSX.Element;
    buttonText?: ReactNodeLike;
}

export const GoogleLoginBtn = memo((props: GoogleLoginBtnProps) => {
    const {
        onCode,
        googleLoginOnSuccessFn,
        about,
        className,
        logoSize,
        ButtonComponent,
        buttonText = 'Continue with Google',
    } = props;
    const googleLoginOnSuccess = googleLoginOnSuccessFn ? googleLoginOnSuccessFn : useGoogleLoginSuccessHandler2();
    const setAccessToken = useSetRecoilState(googleAccessTokenAtom);
    const scope = about ? SCOPE_MAP[about] : SCOPE_ALL;
    const getFeature = () => about;

    const loginButtonOnClick = useGoogleLogin({
        onSuccess: async (response) => {
            const feature = getFeature();
            const {code} = response;

            if (onCode && code) return onCode(code);

            const {accessToken} = await userSocialGoogleApi.token({
                code,
                ...(feature ? {feature} : {}),
            });
            setAccessToken(accessToken);
            return googleLoginOnSuccess(accessToken);
        },
        scope: about === 'login' ? undefined : scope.join(' '),
        flow: 'auth-code',
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <>
            {ButtonComponent && (
                <div onClick={() => loginButtonOnClick()}>
                    <ButtonComponent />
                </div>
            )}

            {!ButtonComponent && (
                <button
                    onClick={() => loginButtonOnClick()}
                    className={`${className} btn btn-lg btn-outline shadow font-medium normal-case space-x-4 bg-white border-slate-200 text-slate-700 hover:bg-white hover:border-primary hover:text-slate-700 focus:bg-blue-50 active:bg-primary-100`}
                >
                    <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        className={`${logoSize ? logoSize : 'w-6 h-6'}`}
                        alt=""
                    />
                    <span>{buttonText}</span>
                </button>
            )}
        </>
    );
});
