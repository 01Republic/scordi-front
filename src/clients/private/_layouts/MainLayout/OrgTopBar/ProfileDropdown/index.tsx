import {EditUserProfileModal} from '^clients/private/_modals/EditUserProfileModal';
import {LinkTo} from '^components/util/LinkTo';
import {ChannelTalk_Url} from '^config/constants';
import {serviceHost} from '^config/environments';
import {UserAvatar} from '^models/User/components/UserAvatar';
import {useCurrentUser} from '^models/User/hook';
import {AdminUsersPageRoute} from '^pages/admin/users';
import {Dropdown} from '^v3/share/Dropdown';
import {ArrowRight, HelpCircle, Home, Link, LogOut, Settings} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';

export const ProfileDropdown = memo(function ProfileDropdown() {
    const {t: tProfile} = useTranslation('profile');
    const {t} = useTranslation('common');
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
                                            {currentUser.name}
                                            {t('orgTopBar.profileDropdown.nameSuffix')}
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
                                    <span>{tProfile('dropdown.setting')}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-700 hover:text-scordi"
                                    onClick={() => window.open(ChannelTalk_Url, '_blank')}
                                >
                                    <HelpCircle />
                                    <span>{tProfile('dropdown.help')}</span>
                                </a>
                            </li>
                            <li>
                                <LinkTo
                                    href={serviceHost}
                                    className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-700 hover:text-scordi"
                                    displayLoading={false}
                                >
                                    <Home />
                                    <span>{tProfile('dropdown.goHomePage')}</span>
                                </LinkTo>
                            </li>
                            <li className="" />
                            <li>
                                <a
                                    className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-400 hover:text-scordi"
                                    onClick={() => logout()}
                                >
                                    <LogOut />
                                    <span>{tProfile('dropdown.logout')}</span>
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
                                            {t('orgTopBar.profileDropdown.adminLink')}
                                            <ArrowRight />
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
