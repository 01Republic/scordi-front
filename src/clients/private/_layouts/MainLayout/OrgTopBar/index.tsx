import {memo, useEffect} from 'react';
import {FaBell, FaPlus} from 'react-icons/fa6';
import {useCurrentUser} from '^models/User/hook';
import {WorkspaceDropdown} from './WorkspaceDropdown';
import {ProfileDropdown} from './ProfileDropdown';
import {LinkTo} from '^components/util/LinkTo';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import Measured from '@measured-im/browser';
import {padStart} from 'lodash';

export const OrgTopBar = memo(() => {
    const {currentUser} = useCurrentUser();
    const currentOrg = useRecoilValue(currentOrgAtom);

    useEffect(() => {
        if (currentUser) {
            Measured.measued('User ID', padStart(`${currentUser.id}`, 5, '0'));
        }
    }, [currentUser]);

    return (
        <header className="container-fluid h-[56px] flex items-center gap-6 border-b bg-white-blurred text-scordi sticky top-0 z-20">
            <div className="hidden sm:block">
                <img src="/images/logo/scordi/favicon-bg-transparent.png" alt="Scordi Logo" className="h-7 mr-2" />
            </div>

            <WorkspaceDropdown />

            <div className="hidden lg:block">
                <div className="text-14 tracking-[0.01rem]">{currentUser?.name}님은 최고 관리자입니다.</div>
            </div>

            <div className="ml-auto flex items-center gap-8">
                <div className="hidden sm:block">
                    <LinkTo
                        href={currentOrg ? OrgSubscriptionSelectPageRoute.path(currentOrg.id) : '#'}
                        className={`btn btn-sm btn-scordi gap-2 ${
                            !currentOrg ? 'btn-disabled !bg-scordi !text-white opacity-30' : ''
                        }`}
                        disabled={!currentOrg}
                        loadingOnBtn
                    >
                        <FaPlus />
                        <span>구독 등록하기</span>
                    </LinkTo>
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
