import {memo, useState} from 'react';
import {useTranslation} from 'next-i18next';
import {useCurrentUser} from '^models/User/hook';
import {AdminUsersPageRoute} from '^pages/admin/users';
import {UserAvatar} from '^models/User/components/UserAvatar';
import {LinkTo} from '^components/util/LinkTo';
import {Dropdown} from '^v3/share/Dropdown';
import {EditUserProfileModal} from '^clients/private/_modals/EditUserProfileModal';
import {ChannelTalk_Url} from '^config/constants';
import {landingPageUrl} from '^config/environments';
import {ArrowRight, HelpCircle, Home, Link, LogOut, Settings} from 'lucide-react';

export const ProfileDropdown = memo(function ProfileDropdown() {
    const {t} = useTranslation('profile');
    const {currentUser, logout} = useCurrentUser(undefined, {
        orgIdParam: 'orgId',
    });
    const [isProfileEditModalOpened, setIsProfileEditModalOpened] = useState(false);

    if (!currentUser) return <></>;

    return (
        <>
            <EditUserProfileModal
                isOpened={isProfileEditModalOpened}
                onClose={() => setIsProfileEditModalOpened(false)}
            />
            <Dropdown
                placement="bottom-end"
                Trigger={() => (
                    <UserAvatar
                        src={currentUser.profileImgUrl}
                        alt={currentUser.name}
                        className="w-8 h-8 mr-[8px] cursor-pointer hover:shadow"
                    />
                )}
                Content={() => {
                    return (
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52">
                            <li>
                                <div className="flex gap-2 bg-base-100 cursor-default p-2">
                                    <UserAvatar
                                        src={currentUser.profileImgUrl}
                                        alt={currentUser.name}
                                        className="w-8 h-8"
                                    />
                                    <div className="overflow-hidden">
                                        <p className="w-full overflow-hidden overflow-ellipsis text-sm font-semibold text-gray-900">
                                            {currentUser.name}님
                                        </p>
                                        <p className="w-full overflow-hidden overflow-ellipsis text-12 text-gray-400">
                                            {currentUser.email}
                                        </p>
                                    </div>
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
                                    onClick={() => window.open(ChannelTalk_Url, '_blank')}
                                >
                                    <HelpCircle />
                                    <span>{t('dropdown.help')}</span>
                                </a>
                            </li>
                            <li>
                                <LinkTo
                                    href={landingPageUrl}
                                    className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-700 hover:text-scordi"
                                    displayLoading={false}
                                >
                                    <Home />
                                    <span>{t('dropdown.goHomePage')}</span>
                                </LinkTo>
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
                    );
                }}
            />
        </>
    );
});
