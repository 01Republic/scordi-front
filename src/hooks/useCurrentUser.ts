import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {AxiosError} from 'axios';
import {removeToken, setToken} from '^api/api';
import {getMemberships} from '^api/membership.api';
import {getUserSession, postUserSession} from '^api/session.api';
import {currentUserAtom} from '^atoms/currentUser.atom';
import {currentUserMembershipAtom} from '^atoms/currentUser.atom';
import {OrgHomeRoute} from '^pages/orgs/[id]/home';
import {UserLoginPageRoute} from '^pages/users/login';
import {WelcomePageRoute} from '^pages/users/signup/welcome';
import {OrgSearchRoute} from '^pages/orgs/search';
import {NextRouter, useRouter} from 'next/router';
import {UserDto, UserLoginRequestDto} from '^types/user.type';
import {errorNotify} from '^utils/toast-notify';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';

type AxiosErrorData = {
    status: number;
    message: string;
};

const loginRequiredHandler = (err: AxiosError<AxiosErrorData>, router: NextRouter, fallbackPath?: string | null) => {
    const status = err.response?.data.status!;
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

export function useCurrentUser(fallbackPath?: string | null) {
    const router = useRouter();
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
    const [currentUserMembership, setCurrentUserMembership] = useRecoilState(currentUserMembershipAtom);

    useEffect(() => {
        getUserSession()
            .then((res) => setCurrentUser(res.data))
            .catch((err) => loginRequiredHandler(err, router, fallbackPath));
    }, []);

    useEffect(() => {
        if (currentUser === null) return;
        if (isNaN(organizationId)) return;

        getMemberships({
            where: {
                userId: currentUser.id,
                organizationId,
            },
        }).then((res) => {
            const membership = res.data.items[0];

            if (!membership) return;

            setCurrentUserMembership(membership);
        });
    }, [currentUser, organizationId]);

    const login = (data: UserLoginRequestDto, href?: string): Promise<UserDto> => {
        return (
            postUserSession(data)
                // catch 는 login 함수를 사용하는 곳에서 개별처리 합니다.
                .then((res) => {
                    setToken(res.data.token);
                    return getUserSession().then(({data}) => {
                        setCurrentUser(data);
                        if (href) router.push(href);
                        return data;
                    });
                })
        );
    };

    const loginRedirect = (user: UserDto) => {
        // org check
        // org ? 대시보드로 이동
        // : search페이지로 이동
        if (user.orgId) {
            router.push(OrgHomeRoute.path(user.orgId));
        } else {
            router.push(OrgSearchRoute.path());
        }
    };

    const logout = () => {
        removeToken();
        setCurrentUser(null);
        router.push(UserLoginPageRoute.path());
    };

    return {currentUser, setCurrentUser, login, loginRedirect, logout, currentUserMembership};
}
