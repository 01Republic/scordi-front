import React from 'react';
import {pathRoute} from '^types/pageRoute.type';
import {UserSignUpPage} from '^components/pages/UserSignUp';

export const UserSignUpPageRoute = pathRoute({
    pathname: '/users/signup',
    path: () => UserSignUpPageRoute.pathname,
});

export default function SignUp() {
    return <UserSignUpPage />;
}
