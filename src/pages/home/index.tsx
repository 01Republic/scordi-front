import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute} from '^types/pageRoute.type';
import {LandingV2HomePage as Page} from '^components/pages/LandingPages/HomePage';

export const LandingV2HomePageRoute = pathRoute({
    pathname: 'home',
    path: () => LandingV2HomePageRoute.pathname,
});

export interface LandingV2HomePageProps {}

export default function LandingV2HomePage(props: LandingV2HomePageProps) {
    const router = useRouter();

    return <Page {...props} />;
}
