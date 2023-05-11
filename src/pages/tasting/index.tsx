import React from 'react';
import {useRouter} from 'next/router';
import {pathRoute} from '^types/pageRoute.type';
import {TastingPage as Page} from '^components/pages/LandingPages/TastingPage';

export const TastingPageRoute = pathRoute({
    pathname: '/tasting',
    path: () => TastingPageRoute.pathname,
});

export interface TastingPageProps {
    // gmailAuthClient: OAuth2Client;
}

// export async function getStaticProps() {
//     return {
//         // props: {gmailAuthClient},
//     };
// }

export default function TastingPage(props: TastingPageProps) {
    const router = useRouter();

    return <Page {...props} />;
}

// TastingPage.getInitialProps = async () => ({});
