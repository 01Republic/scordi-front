import {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {LogOut} from 'lucide-react';
import Image from 'next/image';
import BaseNavLogo from '^public/images/renewallogo/base_nav-logo.png';
import {useCurrentUser} from '^models/User/hook';

interface BaseNavProps {
    //
}

export const BaseNav = memo((props: BaseNavProps) => {
    const {} = props;
    const {currentUser, logout} = useCurrentUser();

    return (
        <header className="container-fluid w-full h-[56px] flex items-center gap-6 border-b bg-white-blurred text-scordi fixed top-0 z-20">
            <div>
                <Image src={BaseNavLogo} alt="scordi" height={21} className="h-[21px]" />
            </div>
            <div className="ml-auto">
                {currentUser && (
                    <LinkTo
                        onClick={() => logout()}
                        className="flex items-center text-14 text-gray-400 hover:text-gray-700 transition-all cursor-pointer gap-2"
                        displayLoading={false}
                    >
                        <LogOut />
                        <span>로그아웃</span>
                    </LinkTo>
                )}
            </div>
        </header>
    );
});
BaseNav.displayName = 'BaseNav';
