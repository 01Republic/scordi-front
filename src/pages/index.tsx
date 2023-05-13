import LandingPage1 from './LandingPage1';
import {LandingPage2} from '^components/pages/LandingPage2';
import {LandingPage202305MainPage} from '^components/pages/LandingPages/202305/MainPage';
import {LandingV2HomePage} from '^components/pages/LandingPages/HomePage';

export default function MainPage() {
    return <LandingV2HomePage />;
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
