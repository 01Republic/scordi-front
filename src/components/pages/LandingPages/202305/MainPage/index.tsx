import React, {memo} from 'react';
import {LandingPageNavBar} from '^components/lab/landing-page-components';
import {AOSProvider} from '^components/pages/LandingPages/components';
import {MainPageHeader} from './Header';

export const LandingPage202305MainPage = memo(() => {
    return (
        <AOSProvider>
            <LandingPageNavBar fluid={true} showLoginButton={false} className="p-4" />

            <MainPageHeader />
        </AOSProvider>
    );
});
