import {memo, useState} from 'react';
import {useCurrentUser} from '^models/User/hook';
import {WorkspaceDropdown} from './WorkspaceDropdown';
import {ProfileDropdown} from './ProfileDropdown';
import {LinkTo} from '^components/util/LinkTo';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {useMeasuredUserId} from '^components/ExternalCDNScripts/measured';
import {t_membershipLevel} from '^models/Membership/types';
import {ExpiredPlanBlockModal} from '^clients/private/_layouts/MainLayout/ExpiredPlanBlockModal';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {useCurrentMembership} from '^models/Membership/hook';
import {Bell, Frown, Plus} from 'lucide-react';
import {OrgSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/subscriptions/connection';

export const OrgTopBar = memo(() => {
    const {currentUser} = useCurrentUser();
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {currentMembership} = useCurrentMembership();
    useMeasuredUserId();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <header className="container-fluid h-[56px] flex items-center gap-6 border-b bg-white-blurred text-scordi sticky top-0 z-20">
            <div className="hidden sm:block">
                <LinkTo href={currentOrg ? OrgMainPageRoute.path(currentOrg.id) : '#'} displayLoading={false}>
                    <img src="/images/renewallogo/scordi-symbol-logo.png" alt="Scordi Logo" className="h-5 mr-2" />
                </LinkTo>
            </div>

            <WorkspaceDropdown />

            <div className="hidden lg:block">
                <div className="text-14 tracking-[0.01rem]">
                    {currentUser?.name}님은{' '}
                    {currentMembership ? (
                        <span>
                            {t_membershipLevel(currentMembership.level, {inWord: false})}입니다
                            <span onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                .
                            </span>
                        </span>
                    ) : (
                        ''
                    )}
                </div>
            </div>

            {/* @ts-ignore */}
            <marquee className={`w-[20rem] ${isHovered ? '' : 'hidden'}`} direction="right">
                <Frown className="text-red-600" fontSize={20} />
                {/* @ts-ignore */}
            </marquee>

            <div className="ml-auto flex items-center gap-8">
                <div className="hidden sm:block">
                    <LinkTo
                        href={currentOrg ? OrgSubscriptionConnectionPageRoute.path(currentOrg.id) : '#'}
                        className={`btn btn-sm btn-scordi gap-2 no-animation btn-animation ${
                            !currentOrg ? 'btn-disabled !bg-scordi !text-white opacity-30' : ''
                        }`}
                        disabled={!currentOrg}
                        loadingOnBtn
                    >
                        <Plus />
                        <span>구독 등록하기</span>
                    </LinkTo>
                </div>

                <div className="text-gray-400 transition-all hover:text-scordi-500 cursor-pointer">
                    <Bell className="size-5" />
                </div>

                <div>
                    <ProfileDropdown />
                </div>
            </div>
            {currentOrg && !currentUser?.isAdmin && <ExpiredPlanBlockModal currentOrg={currentOrg} />}
        </header>
    );
});
OrgTopBar.displayName = 'OrgTopBar';
