import React, {Fragment, memo} from 'react';
import {GoogleOAuthProvider, useGoogleLogin} from '@react-oauth/google';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useGoogleLoginSuccessHandler2} from '^hooks/useGoogleLoginSuccessHandler2';
import {googleAccessTokenAtom, googleButtonIsLoading} from '^components/pages/UsersLogin/atom';
import {GoogleAccessTokenQueryDto, userSocialGoogleApi} from '^api/social-google.api';
import {uniq} from '^utils/array';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {googleOAuth} from '^config/environments';
import {errorToast} from '^api/api';

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

interface GoogleLoginBtnProps extends WithChildren {
    onCode?: (code: string) => void;
    onToken?: (accessToken: string) => Promise<void> | void;
    about?: keyof typeof SCOPE_MAP;
    className?: string;
    logoSize?: string;
    ButtonComponent?: () => JSX.Element;
    buttonText?: ReactNodeElement;
}

export const GoogleLoginBtn = memo((props: GoogleLoginBtnProps) => {
    const {
        onCode,
        onToken,
        about,
        className,
        logoSize,
        ButtonComponent,
        buttonText = 'Continue with Google',
        children,
    } = props;
    const onAccessToken = onToken ? onToken : useGoogleLoginSuccessHandler2();
    const setAccessToken = useSetRecoilState(googleAccessTokenAtom);
    const [isLoading, setIsLoading] = useRecoilState(googleButtonIsLoading);
    const scope = about ? SCOPE_MAP[about] : SCOPE_ALL;
    const getFeature = () => about;

    const loginButtonOnClick = useGoogleLogin({
        onSuccess: async (response) => {
            const feature = getFeature();
            const {code} = response;

            if (onCode && code) {
                setIsLoading(false);
                return onCode(code);
            }

            const dto: GoogleAccessTokenQueryDto = {code};
            if (feature) dto.feature = feature;

            return userSocialGoogleApi
                .token(dto)
                .then((tokenData) => {
                    setAccessToken(tokenData.accessToken);
                    return tokenData.accessToken;
                })
                .then(onAccessToken)
                .catch(errorToast)
                .finally(() => setIsLoading(false));
        },
        scope: about === 'login' ? undefined : scope.join(' '),
        flow: 'auth-code',
        onError: (error) => {
            setIsLoading(false);
            onCode && onCode(error.error as string);
        },
    });

    const onClick = () => {
        setIsLoading(true);
        loginButtonOnClick();
    };

    return (
        <>
            {(ButtonComponent || children) && (
                <div data-component="GoogleLoginBtn" data-about={about} onClick={onClick}>
                    {ButtonComponent ? <ButtonComponent /> : children}
                </div>
            )}

            {!(ButtonComponent || children) && (
                <button
                    data-component="GoogleLoginBtn"
                    data-about={about}
                    onClick={onClick}
                    className={`${className} ${
                        isLoading ? 'link_to-loading' : ''
                    } btn btn-lg btn-outline shadow font-medium normal-case space-x-4 bg-white border-slate-200 text-slate-700 hover:bg-white hover:border-primary hover:text-slate-700 focus:bg-scordi-50 active:bg-primary-100`}
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

export const useGoogleLoginButton = () => {
    const accessToken = useRecoilValue(googleAccessTokenAtom);
    const [isLoading, setIsLoading] = useRecoilState(googleButtonIsLoading);

    return {
        accessToken,
        isLoading,
        setIsLoading,
    };
};

interface GoogleAdminOAuthButtonProps extends WithChildren {
    onCode: (code: string) => void;
}

export const GoogleAdminOAuthButton = memo((props: GoogleAdminOAuthButtonProps) => {
    const {onCode, children} = props;

    return (
        <GoogleOAuthProvider clientId={googleOAuth.adminClient.id}>
            <GoogleLoginBtn about="admin" onCode={onCode}>
                {children}
            </GoogleLoginBtn>
        </GoogleOAuthProvider>
    );
});
GoogleAdminOAuthButton.displayName = 'GoogleAdminOAuthButton';

interface GoogleGmailOAuthButtonProps extends WithChildren {
    onCode: (code: string) => void;
}

export const GoogleGmailOAuthButton = memo((props: GoogleGmailOAuthButtonProps) => {
    const {onCode, children} = props;

    return (
        <GoogleOAuthProvider clientId={googleOAuth.gmailClient.id}>
            <GoogleLoginBtn about="gmail" onCode={onCode}>
                {children}
            </GoogleLoginBtn>
        </GoogleOAuthProvider>
    );
});
GoogleGmailOAuthButton.displayName = 'GoogleGmailOAuthButton';
