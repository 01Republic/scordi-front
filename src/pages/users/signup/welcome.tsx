import {pathRoute} from '^types/pageRoute.type';
import {UserWelcomePage} from '^components/pages/UserSignUp/UserWelcome';

export const WelcomePageRoute = pathRoute({
    pathname: '/users/signup/welcome',
    path: () => WelcomePageRoute.pathname,
});

export default function Welcome() {
    return <UserWelcomePage />;
}
