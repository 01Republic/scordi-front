import LandingPage1 from './LandingPage1';
import {LandingPage2} from '^components/pages/LandingPage2';
import {LandingPage202305MainPage} from '^components/pages/LandingPages/202305/MainPage';
import {LandingV2HomePage} from '^components/pages/LandingPages/HomePage';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {publicPageRequires} from '^types/utils/18n.type';
import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {LandingHomePage2} from '^components/pages/LandingPages/HomePage2';

export const MainPageRoute = pathRoute({
    pathname: '/',
    path: () => pathReplace(MainPageRoute.pathname),
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale, [...publicPageRequires, 'publicMain'])),
        // Will be passed to the page component as props
    },
});

export default function MainPage() {
    return <LandingHomePage2 />;
}

/**
 * 다음 주소에서 확인
 * - 개발환경: http://localhost:3000/landing2
 * - 스테이징: https://scordi.io:8080/landing2
 * - 실서비스: https://scordi.io/landing2
 */
// export default function MainPage() {
//     return <LandingPage2 />;
// }
