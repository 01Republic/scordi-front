import React from 'react';
import {pathRoute} from '^types/pageRoute.type';
import {LandingPageForMarketer} from '^components/pages/LandingPageForMarketer';

export const LandingForMarketerPageRoute = pathRoute({
    pathname: '/marketer',
    path: () => LandingForMarketerPageRoute.pathname,
});

export default function LandingForMarketerPage() {
    return <LandingPageForMarketer />;
}
