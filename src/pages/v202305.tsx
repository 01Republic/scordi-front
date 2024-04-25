import React from 'react';
import {pathRoute} from '^types/pageRoute.type';
import {LandingPage202305MainPage} from '^clients/public/home/LandingPages/202305/MainPage';

export const V202305MainPageRoute = pathRoute({
    pathname: '/v202305',
    path: () => V202305MainPageRoute.pathname,
});

export default function V202305MainPage() {
    return <LandingPage202305MainPage />;
}
