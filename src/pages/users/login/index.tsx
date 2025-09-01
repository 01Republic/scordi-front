import React from 'react';
import {pathRoute} from '^types/pageRoute.type';
import {UsersLoginPage} from '^clients/public/userAuth/LoginPage/UsersLoginPage';

export const UserLoginPageRoute = pathRoute({
    pathname: '/users/login',
    path: () => UserLoginPageRoute.pathname,
});

export default function LoginPage() {
    return <UsersLoginPage />;
}
