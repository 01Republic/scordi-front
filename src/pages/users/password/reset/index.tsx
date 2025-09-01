import React from 'react';
import {pathRoute} from '^types/pageRoute.type';
import {ResetPasswordPage} from '^clients/public/userAuth/password/ResetPasswordPage';

export const UserPasswordResetPageRoute = pathRoute({
    pathname: '/users/password/reset',
    path: () => UserPasswordResetPageRoute.pathname,
});

export default function LoginPage() {
    return <ResetPasswordPage />;
}
