import Image from 'next/image';
import {UserLoginPageRoute} from '^pages/users/login';
import {WithChildren} from '^types/global.type';
import {useRouter} from 'next/router';
import {MainPageRoute} from '^pages/index';
import {TastingPageRoute} from '^pages/tasting';
import {FiMenu} from '@react-icons/all-files/fi/FiMenu';
import {PostListPageRoute} from '^pages/posts';
import {ProductListPageRoute} from '^pages/products';
import {useModal} from '^v3/share/modals/useModal';
import {inquiryModalAtom} from '^components/pages/LandingPages/HomePage2/InquiryModal';

interface LandingPageNavBarProps extends WithChildren {
    fluid?: boolean;
    sticky?: boolean;
    bgBlur?: boolean;
    showLoginButton?: boolean;
    className?: string;
}

export const LandingPageNavBar = (props: LandingPageNavBarProps) => {
    const {fluid = false, sticky = false, bgBlur = false, showLoginButton = true, className = '', children} = props;
    const router = useRouter();
    const {open} = useModal(inquiryModalAtom);

    const introducePath = '/#product-section';
    const saasPath = ProductListPageRoute.path();
    const blogPath = PostListPageRoute.path();

    return (
        <div
            className={`${bgBlur ? 'backdrop-blur-xl' : 'bg-white'} ${sticky ? 'sticky top-0' : ''} z-10`}
            style={{
                ...(bgBlur
                    ? {
                          backgroundColor: 'rgba(255, 255, 255, .8)',
                      }
                    : {}),
            }}
        >
            <div className={`p-4 ${fluid ? '' : 'container sm:px-0'} navbar ${className}`}>
                <div className="navbar-start">
                    <a
                        className={`btn btn-ghost btn-hover-init normal-case text-2xl md:text-3xl ${
                            fluid ? '' : 'px-0'
                        }`}
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
                            src="/images/logo/scordi/logo-black-transparent-2.png"
                            alt="Scordi logo"
                            className="relative mr-1 w-[140px]"
                        />
                    </a>

                    <div className="hidden sm:flex gap-2 items-center justify-between px-4">
                        <a
                            href={introducePath}
                            className="hidden md:inline-flex btn btn-ghost normal-case btn-hover-init"
                        >
                            제품소개
                        </a>
                        <a href={TastingPageRoute.path()} className="btn btn-ghost normal-case btn-hover-init">
                            SaaS 스캐너
                        </a>
                        <a href={saasPath} className="btn btn-ghost normal-case btn-hover-init">
                            컬렉션
                        </a>
                        <a href={blogPath} className="hidden md:inline-flex btn btn-ghost normal-case btn-hover-init">
                            블로그
                        </a>
                    </div>
                </div>
                <div className="navbar-center lg:flex" />

                <div className="navbar-end gap-2">
                    {children}

                    {showLoginButton && (
                        <div className="flex gap-2 items-center justify-between">
                            <a className="btn btn-ghost" href={UserLoginPageRoute.path()}>
                                로그인
                            </a>

                            <a className="btn hidden sm:inline-flex btn-scordi" onClick={open}>
                                도입 문의하기
                            </a>
                        </div>
                    )}

                    <div className="dropdown dropdown-end sm:hidden">
                        <label tabIndex={0} className="btn btn-outline border-gray-400 text-gray-500 sm:hidden">
                            <FiMenu size={20} />
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content p-2 shadow-lg bg-base-100 !fixed left-0 w-full"
                        >
                            <li>
                                <a href={introducePath}>제품소개</a>
                            </li>
                            <li>
                                <a href={TastingPageRoute.path()}>SaaS 스캐너</a>
                            </li>
                            <li>
                                <a href={saasPath}>컬렉션</a>
                            </li>
                            <li>
                                <a href={blogPath}>블로그</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
