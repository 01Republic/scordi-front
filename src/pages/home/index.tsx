import React from 'react';
import {LandingHomePage3} from '^clients/public/home/LandingPages/HomePage3';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';
// import {useRouter} from 'next/router';
// import {pathRoute} from '^types/pageRoute.type';
// import {LandingV2HomePage as Page} from '^clients/public/home/LandingPages/HomePage';
//
// export const LandingV2HomePageRoute = pathRoute({
//     pathname: '/home',
//     path: () => LandingV2HomePageRoute.pathname,
// });
//
// interface LandingV2HomePageProps {}
//
// function LandingV2HomePage(props: LandingV2HomePageProps) {
//     const router = useRouter();
//
//     return <Page {...props} />;
// }

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...publicPageRequires, 'publicMain'])),
        // Will be passed to the page component as props
    },
});

export default function Page() {
    return <LandingHomePage3 />;
}
