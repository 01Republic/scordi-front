import Image from 'next/image';
import {UserLoginPageRoute} from '^pages/users/login';
import {WithChildren} from '^types/global.type';
import {useRouter} from 'next/router';
import {MainPageRoute} from '^pages/index';

interface LandingPageNavBarProps extends WithChildren {
    fluid?: boolean;
    showLoginButton?: boolean;
    className?: string;
}

export const LandingPageNavBar = (props: LandingPageNavBarProps) => {
    const {fluid = false, showLoginButton = true, className = '', children} = props;
    const router = useRouter();

    const onClickCta = () => {
        const ctaBtn = document.querySelector('#cta-1') as HTMLElement;
        if (ctaBtn) ctaBtn.click();
    };

    return (
        <div className={`${fluid ? '' : 'container'} navbar ${className}`}>
            <div className="navbar-start">
                <a
                    className="btn btn-ghost btn-hover-init normal-case text-2xl md:text-3xl"
                    onClick={() => router.push(MainPageRoute.path())}
                >
                    {/*<Image*/}
                    {/*    src="/logo-transparent.png"*/}
                    {/*    alt="Scordi logo"*/}
                    {/*    width={36}*/}
                    {/*    height={36}*/}
                    {/*    className="relative top-1 mr-1"*/}
                    {/*/>*/}
                    {/*<span>scordi</span>*/}
                    <img
                        src="/images/logo/logo-black-transparent-2.png"
                        alt="Scordi logo"
                        className="relative mr-1 w-[120px]"
                    />
                </a>
            </div>
            <div className="navbar-center lg:flex" />

            <div className="navbar-end">
                {children}

                {showLoginButton && (
                    <a className="btn btn-outline btn-primary" href={UserLoginPageRoute.path()}>
                        클로즈베타 로그인
                    </a>
                )}
            </div>
        </div>
    );
};
