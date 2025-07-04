import {useEffect, useRef} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {AxiosError} from 'axios';
import {getToken, removeToken, setToken} from '^api/api';
import {userSessionApi} from '^models/User/api/session';
import {currentUserAtom, authenticatedUserDataAtom, getCurrentUserQueryAtom} from '^models/User/atom';
import {UserLoginPageRoute} from '^pages/users/login';
import {OrgEmptyPageRoute} from '^pages/orgs/empty';
import {NextRouter, useRouter} from 'next/router';
import {UserDto, UserLoginRequestDto, UserSocialLoginRequestDto} from '^models/User/types';
import {errorNotify} from '^utils/toast-notify';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {userSocialGoogleApi} from '^api/social-google.api';
import {useAlert} from '^hooks/useAlert';
import {OrgListPageRoute} from '^pages/orgs';
import {useQuery} from '@tanstack/react-query';

type AxiosErrorData = {
    status: number;
    message: string;
};

const loginRequiredHandler = (err: AxiosError<AxiosErrorData>, router: NextRouter, fallbackPath?: string | null) => {
    const {alert} = useAlert();
    const status = err.response?.data.status;

    if (status === 401 || status === 404) {
        // fallbackPath 가 null 로 주입된 경우에는 튕기지 않습니다.
        if (fallbackPath === null) return;

        alert.error('다시 로그인 해주세요.', '로그인 세션이 만료되었습니다.').then(() =>
            // 로그인이 실패한 경우, 로그인 페이지로 튕겨냅니다.
            router.push(fallbackPath || UserLoginPageRoute.path()),
        );
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
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const setQuery = useSetRecoilState(getCurrentUserQueryAtom);
    const [authenticatedUserData, setAuthenticatedUserData] = useRecoilState(authenticatedUserDataAtom);
    const currentUserMembership = currentUser?.memberships?.[0];

    // const getSession = (force = false) => {
    //     const apiToken = getToken();
    //     setQuery((oldQuery) => {
    //         if (!force && oldQuery === apiToken) return oldQuery;
    //
    //         new Promise((resolve, reject) => {
    //             userSessionApi
    //                 .index()
    //                 .then((res) => {
    //                     setCurrentUser(res.data);
    //                     resolve(res.data);
    //                 })
    //                 .catch((err) => {
    //                     // invalid token 에러가 발생하면 localStorage token 삭제
    //                     localStorage.removeItem('token');
    //                     loginRequiredHandler(err, router, fallbackPath);
    //                     reject();
    //                 });
    //         });
    //
    //         return apiToken;
    //     });
    // };

    const token = getToken();

    const query = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const res = await userSessionApi.index();
            return res.data;
        },
        enabled: !!token,
    });

    useEffect(() => {
        if (!router.isReady || !query.data) return;

        setCurrentUser((prev) => {
            if (prev?.id === query.data.id) {
                return prev;
            }
            return query.data;
        });
    }, [router.isReady, query.data]);

    // const login = (data: UserLoginRequestDto, href?: string): Promise<UserDto> => {
    //     return (
    //         userSessionApi
    //             .create(data)
    //             // catch 는 login 함수를 사용하는 곳에서 개별처리 합니다.
    //             .then((res) => {
    //                 setToken(res.data.token);
    //                 return userSessionApi.index().then(({data}) => {
    //                     setCurrentUser(data);
    //                     if (href) router.push(href);
    //                     return data;
    //                 });
    //             })
    //     );
    // };

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
        const {memberships = []} = user;
        const [membership] = memberships;

        // 여러개의 워크스페이스에 속해있는 경우 => 선택페이지로 이동
        if (memberships.length > 1) return OrgListPageRoute.path();

        // 하나의 워크스페이스에 속해 있는 경우 => 그 워크스페이스 홈으로 이동
        if (membership) return OrgMainPageRoute.path(membership.organizationId);

        // 조직이 아직 생성되지 않은 사용자
        return OrgEmptyPageRoute.path();
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
