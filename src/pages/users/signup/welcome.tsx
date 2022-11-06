import {PageRoute} from "^types/pageRoute.type";

export const WelcomePageRoute: PageRoute = {
  pathname: '/users/signup/welcome',
  path: () => WelcomePageRoute.pathname,
};

const Welcome = () => {
    return (
        <></>
    )
}