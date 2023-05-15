import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute} from '^types/pageRoute.type';
import {BetaSignPhoneAuthPage} from '^components/pages/LandingPages/BetaSignPhoneAuthPage';

export const SignPhoneAuthPageRoute = pathRoute({
    pathname: 'sign/phone',
    path: () => SignPhoneAuthPageRoute.pathname,
});

export default function SignPhoneAuthPage() {
    const router = useRouter();

    return <BetaSignPhoneAuthPage />;
}
