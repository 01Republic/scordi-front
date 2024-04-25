import React from 'react';
import {pathRoute} from '^types/pageRoute.type';
import {LandingPageForMarketer} from '^clients/public/home/LandingPages/202305/LandingPageForMarketer';

export const LandingForMarketerPageRoute = pathRoute({
    pathname: '/marketer',
    path: () => LandingForMarketerPageRoute.pathname,
});

export default function LandingForMarketerPage() {
    return <LandingPageForMarketer />;
}
