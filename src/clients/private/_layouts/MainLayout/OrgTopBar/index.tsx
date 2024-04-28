import {memo} from 'react';
import {FaBell, FaPlus} from 'react-icons/fa6';
import {useCurrentUser} from '^models/User/hook';
import {WorkspaceDropdown} from './WorkspaceDropdown';
import {ProfileDropdown} from './ProfileDropdown';

export const OrgTopBar = memo(() => {
    const {currentUser} = useCurrentUser();

    return (
        <header className="container-fluid h-[56px] flex items-center gap-6 border-b bg-white-blurred text-scordi sticky top-0 z-[1]">
            <div className="hidden sm:block">
                <img src="/images/logo/scordi/favicon-bg-transparent.png" alt="Scordi Logo" className="h-7 mr-2" />
            </div>

            <WorkspaceDropdown />

            <div className="hidden lg:block">
                <div className="text-14 tracking-[0.01rem]">{currentUser?.name}님은 최고 관리자입니다.</div>
            </div>

            <div className="ml-auto flex items-center gap-8">
                <div className="hidden sm:block">
                    <button className="btn btn-sm btn-scordi gap-2">
                        <FaPlus />
                        <span>구독 등록하기</span>
                    </button>
                </div>

                <div className="text-gray-400 transition-all hover:text-scordi-500 cursor-pointer">
                    <FaBell size={20} className="" />
                </div>

                <div>
                    <ProfileDropdown />
                </div>
            </div>
        </header>
    );
});
OrgTopBar.displayName = 'OrgTopBar';
