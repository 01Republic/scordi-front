import {useEffect, useRef} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {AxiosError} from 'axios';
import {getToken, removeToken, setToken} from '^api/api';
import {userSessionApi} from '^models/User/api/session';
import {currentUserAtom, authenticatedUserDataAtom} from '^models/User/atom';
import {UserLoginPageRoute} from '^pages/users/login';
import {OrgSearchRoute} from '^pages/orgs/search';
import {NextRouter, useRouter} from 'next/router';
import {UserDto, UserLoginRequestDto, UserSocialLoginRequestDto} from '^models/User/types';
import {errorNotify} from '^utils/toast-notify';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {userSocialGoogleApi} from '^api/social-google.api';

type AxiosErrorData = {
    status: number;
    message: string;
};

const loginRequiredHandler = (err: AxiosError<AxiosErrorData>, router: NextRouter, fallbackPath?: string | null) => {
    const status = err.response?.data.status;
    if (status === 401) {
        // fallbackPath 가 null 로 주입된 경우에는 튕기지 않습니다.
        if (fallbackPath === null) return;

        // 로그인이 실패한 경우, 로그인 페이지로 튕겨냅니다.
        router.push(fallbackPath || UserLoginPageRoute.path());
    } else {
        // 그 외의 에러는 토스트 메세지만 띄워줍니다.
        errorNotify(err);
    }
};

interface CurrentUserOption {
    orgIdParam?: string;
}

export function useCurrentUser(fallbackPath?: string | null, opt?: CurrentUserOption) {
    const router = useRouter();
    const initialized = useRef(false);
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const [authenticatedUserData, setAuthenticatedUserData] = useRecoilState(authenticatedUserDataAtom);
    const currentUserMembership = currentUser?.memberships?.[0];

    useEffect(() => {
        if (currentUser) return;

        const apiToken = getToken();
        if (!apiToken) return;

        if (!initialized.current) {
            initialized.current = true;
            userSessionApi
                .index()
                .then((res) => setCurrentUser(res.data))
                .catch((err) => {
                    // invalid token 에러가 발생하면 localStorage token 삭제
                    localStorage.removeItem('token');
                    loginRequiredHandler(err, router, fallbackPath);
                });
        }
    }, []);

    const login = (data: UserLoginRequestDto, href?: string): Promise<UserDto> => {
        return (
            userSessionApi
                .create(data)
                // catch 는 login 함수를 사용하는 곳에서 개별처리 합니다.
                .then((res) => {
                    setToken(res.data.token);
                    return userSessionApi.index().then(({data}) => {
                        setCurrentUser(data);
                        if (href) router.push(href);
                        return data;
                    });
                })
        );
    };

    const socialLogin = (data: UserSocialLoginRequestDto, href?: string): Promise<UserDto> => {
        return userSessionApi
            .createBySocialAccount(data)
            .then(({data: {token}}) => setToken(token))
            .then(() => userSessionApi.index())
            .then(({data: user}) => {
                setCurrentUser(user);
                if (href) router.push(href);
                return user;
            });
    };

    const getLoginRedirectPath = (user: UserDto) => {
        // org check
        // org ? 대시보드로 이동
        // : search페이지로 이동
        if (user.orgId) {
            return V3OrgHomePageRoute.path(user.orgId);
        } else {
            return OrgSearchRoute.path();
        }
    };

    const loginRedirect = (user: UserDto) => router.push(getLoginRedirectPath(user));

    const logout = () => {
        removeToken();
        setCurrentUser(null);
        setAuthenticatedUserData(undefined);
        router.push(UserLoginPageRoute.path());
    };

    return {
        currentUser,
        setCurrentUser,
        // login,
        socialLogin,
        getLoginRedirectPath,
        loginRedirect,
        logout,
        currentUserMembership,
        authenticatedUserData,
        setAuthenticatedUserData,
    };
}

export const useSocialLogin = () => {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

    return (data: UserSocialLoginRequestDto, href?: string): Promise<UserDto> => {
        return userSessionApi
            .createBySocialAccount(data)
            .then(({data: {token}}) => setToken(token))
            .then(() => userSessionApi.index())
            .then(({data: user}) => {
                setCurrentUser(user);
                if (href) router.push(href);
                return user;
            });
    };
};

export const useSocialLoginV2 = () => {
    const router = useRouter();
    const setCurrentUser = useSetRecoilState(currentUserAtom);

    return async (accessToken: string, href?: string): Promise<UserDto> => {
        return userSocialGoogleApi
            .login(accessToken)
            .then(({data: {token}}) => setToken(token))
            .then(() => userSessionApi.index())
            .then(({data: user}) => {
                setCurrentUser(user);
                if (href) router.push(href);
                return user;
            });
    };
};
