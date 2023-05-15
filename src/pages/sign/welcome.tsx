import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute} from '^types/pageRoute.type';
import {CalendlyWelcomePage} from '^components/pages/LandingPages/CalendlyWelcomePage';

export const SignWelcomePageRoute = pathRoute({
    pathname: '/sign/welcome',
    path: () => SignWelcomePageRoute.pathname,
});

export default function SignWelcomePage() {
    const router = useRouter();

    return <CalendlyWelcomePage />;
}
