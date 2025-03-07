import {memo, useState} from 'react';
import {useCurrentUser} from '^models/User/hook';
import {UserAvatar} from '^v3/share/UserAvatar';
import {useRecoilValue} from 'recoil';
import {MembershipLevel} from 'src/models/Membership/types';
import {useRouter} from 'next/router';
import {currentOrgAtom} from '^models/Organization/atom';
import {useTranslation} from 'next-i18next';
import {AdminUsersPageRoute} from '^pages/admin/users';
import {useOnResize2} from '^components/util/onResize2';
import {LinkTo} from '^components/util/LinkTo';
import {EditUserProfileModal} from '^clients/private/_modals/EditUserProfileModal';
import {ChannelTalk_Url} from '^config/constants';
import {ArrowRight, ChevronDown, HelpCircle, Home, Link, LogOut, Settings} from 'lucide-react';

export const TopNavProfileButton = memo(() => {
    const router = useRouter();
    const commonLocale = useTranslation('common');
    const profileLocale = useTranslation('profile');
    const currentOrg = useRecoilValue(currentOrgAtom);
    const [isProfileEditModalOpened, setIsProfileEditModalOpened] = useState(false);
    const {currentUser, logout, currentUserMembership} = useCurrentUser(undefined, {
        orgIdParam: 'orgId',
    });
    const {isMobile} = useOnResize2();

    if (!currentOrg || !currentUser || !currentUserMembership) {
        return <span className="text-gray-500 text-sm px-4">조직 정보를 불러오고 있습니다...</span>;
    }

    const isOwner = currentUserMembership.level === MembershipLevel.OWNER;

    const {t} = profileLocale;

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn btn-sm normal-case flex items-center gap-1">
                {/*<UserAvatar user={currentUser} roundClass="rounded-lg" />*/}
                <span>{isMobile ? currentUser.name : currentUser.email}</span>
                <ChevronDown size={18} />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52">
                <li>
                    <div className="flex gap-2 bg-base-100 cursor-default p-2">
                        <UserAvatar user={currentUser} roundClass="rounded-lg" />
                        <p className="text-sm font-semibold text-gray-900">{currentUser.name}님</p>
                    </div>
                </li>
                <li>
                    <a
                        className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-700 hover:text-scordi"
                        onClick={() => setIsProfileEditModalOpened(true)}
                    >
                        <Settings />
                        <span>{t('dropdown.setting')}</span>
                    </a>
                </li>
                <li>
                    <a
                        className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-700 hover:text-scordi"
                        href={ChannelTalk_Url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <HelpCircle />
                        <span>{t('dropdown.help')}</span>
                    </a>
                </li>
                <li>
                    <a
                        className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-700 hover:text-scordi"
                        onClick={() => router.push('/')}
                    >
                        <Home />
                        <span>{t('dropdown.goHomePage')}</span>
                    </a>
                </li>
                <li className="" />
                <li>
                    <a
                        className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-400 hover:text-scordi"
                        onClick={() => logout()}
                    >
                        <LogOut />
                        <span>{t('dropdown.logout')}</span>
                    </a>
                </li>
                {currentUser.isAdmin && (
                    <li>
                        <LinkTo
                            href={AdminUsersPageRoute.path()}
                            className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-400 hover:text-scordi"
                        >
                            <Link />
                            <span className="flex gap-2 items-center justify-between w-full">
                                스코디 어드민 <ArrowRight />
                            </span>
                        </LinkTo>
                    </li>
                )}
            </ul>
            <EditUserProfileModal
                isOpened={isProfileEditModalOpened}
                onClose={() => setIsProfileEditModalOpened(false)}
            />
        </div>
    );
});
