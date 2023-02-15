import React from 'react';
import {pathRoute} from '^types/pageRoute.type';
import {UsersLoginPage} from '^components/pages/UsersLogin';

// NOTE: PATH 들은 인라인 문자열로 중복 작성하지 않고 한 곳에서 정의하고 유지했우면 하는데 묘수가 없을까.
export const UserLoginPageRoute = pathRoute({
    pathname: '/users/login',
    path: () => UserLoginPageRoute.pathname,
});

export default function LoginPage() {
    return <UsersLoginPage />;
}
