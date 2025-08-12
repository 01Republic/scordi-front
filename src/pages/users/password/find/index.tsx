import React from 'react';
import {pathRoute} from '^types/pageRoute.type';
import {FindPasswordPage} from '^clients/public/userAuth/password/FindPasswordPage';

export const UserPasswordFindPageRoute = pathRoute({
    pathname: '/users/password/find',
    path: () => UserPasswordFindPageRoute.pathname,
});

export default function LoginPage() {
    return <FindPasswordPage />;
}
