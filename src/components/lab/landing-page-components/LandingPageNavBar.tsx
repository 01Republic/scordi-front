import Image from 'next/image';
import {UserLoginPageRoute} from '^pages/users/login';
import {WithChildren} from '^types/global.type';
import {useRouter} from 'next/router';
import {MainPageRoute} from '^pages/index';
import {TastingPageRoute} from '^pages/tasting';
import {FiMenu} from '@react-icons/all-files/fi/FiMenu';
import {PostListPageRoute} from '^pages/posts';
import {ProductListPageRoute} from '^pages/products';

interface LandingPageNavBarProps extends WithChildren {
    fluid?: boolean;
    showLoginButton?: boolean;
    className?: string;
}

export const LandingPageNavBar = (props: LandingPageNavBarProps) => {
    const {fluid = false, showLoginButton = true, className = '', children} = props;
    const router = useRouter();

    const introducePath = '/#product-section';
    const onClickCta = () => {
        const ctaBtn = document.querySelector('#cta-1') as HTMLElement;
        if (ctaBtn) ctaBtn.click();
    };

    const saasPath = ProductListPageRoute.path();
    const blogPath = PostListPageRoute.path();

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

                <div className="hidden sm:flex gap-2 items-center justify-between px-4">
                    <a href={introducePath} className="btn btn-ghost btn-sm normal-case btn-hover-init">
                        제품소개
                    </a>
                    <a href={saasPath} className="btn btn-ghost btn-sm normal-case btn-hover-init">
                        SaaS
                    </a>
                    <a href={blogPath} className="btn btn-ghost btn-sm normal-case btn-hover-init">
                        블로그
                    </a>
                </div>
            </div>
            <div className="navbar-center lg:flex" />

            <div className="navbar-end gap-2">
                {children}

                {showLoginButton && (
                    <div className="flex gap-2 items-center justify-between sm:px-4">
                        <a
                            className="btn btn-sm hidden sm:inline-flex btn-outline btn-scordi"
                            href={UserLoginPageRoute.path()}
                        >
                            로그인
                        </a>

                        <a className="btn btn-sm btn-scordi" href={TastingPageRoute.path()}>
                            데모 체험하기
                        </a>
                    </div>
                )}

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-sm btn-outline border-gray-400 text-gray-500 sm:hidden">
                        <FiMenu size={20} />
                    </label>
                    <ul tabIndex={0} className="menu dropdown-content p-2 shadow-lg bg-base-100 !fixed left-0 w-full">
                        <li>
                            <a href={introducePath}>제품소개</a>
                        </li>
                        <li>
                            <a href={saasPath}>SaaS</a>
                        </li>
                        <li>
                            <a href={blogPath}>블로그</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
