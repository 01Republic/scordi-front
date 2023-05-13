import React from 'react';
import {pathRoute} from '^types/pageRoute.type';
import {LandingPage2 as Page} from '^components/pages/LandingPage2';

export const LandingPage2Route = pathRoute({
    pathname: '/landing2',
    path: () => LandingPage2Route.pathname,
});

export default function LandingPage2() {
    return <Page />;
}
