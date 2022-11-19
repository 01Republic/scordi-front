import {PageRoute} from "^types/pageRoute.type";
import {DefaultButton} from "^components/Button";
import {OrgHomeRoute} from "^pages/orgs/[id]/home";
import Image from "next/image";
import {useRouter} from "next/router";
import {useCurrentUser} from "^hooks/useCurrentUser";

export const WelcomePageRoute: PageRoute = {
    pathname: '/users/signup/welcome',
    path: () => WelcomePageRoute.pathname,
};

const Welcome = () => {
    const router = useRouter();
    const user = useCurrentUser();

    if (!user) return null
    return (
        <div className={'mx-auto px-5 my-20 w-full max-w-md space-y-5'}>
            <h1>스코디 가입을 환영합니다!</h1>
            <p>
                가입해 주셔서 감사합니다. <br/>
                스코디와 함께 똑똑한 비용관리를 시작해보세요!
            </p>
            <Image src={'/images/welcome/solar system gloss.png'} width={184} height={184}/>
            <div className={'flex justify-end mb-4'}>
                <Image src={'/images/welcome/Astronaut3 gloss.png'} width={229} height={241}/>
            </div>
            <DefaultButton text={'비용관리 시작하기'} onClick={() => router.push(OrgHomeRoute.path(user.orgId))}/>
        </div>
    )
}

export default Welcome;