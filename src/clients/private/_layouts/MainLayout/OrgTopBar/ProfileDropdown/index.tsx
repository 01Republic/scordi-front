import {memo} from 'react';
import {useCurrentUser} from '^models/User/hook';
import {UserAvatar} from '^models/User/components/UserAvatar';
import {Dropdown} from '^v3/share/Dropdown';
import {AiOutlineSetting} from '@react-icons/all-files/ai/AiOutlineSetting';
import {AiOutlineQuestionCircle} from '@react-icons/all-files/ai/AiOutlineQuestionCircle';
import {AiOutlineHome} from '@react-icons/all-files/ai/AiOutlineHome';
import {BiLogOut} from '@react-icons/all-files/bi/BiLogOut';
import {LinkTo} from '^components/util/LinkTo';
import {AdminUsersPageRoute} from '^pages/admin/users';
import {PiLinkBold} from 'react-icons/pi';
import {BsArrowRight} from 'react-icons/bs';
import {useTranslation} from 'next-i18next';
import {useSetRecoilState} from 'recoil';
import {UserEditModal, userEditModalIsShow} from '^v3/share/modals/UserEditModal';
import {useRouter} from 'next/router';

export const ProfileDropdown = memo(function ProfileDropdown() {
    const router = useRouter();
    // const {currentUser} = useCurrentUser();
    const {t} = useTranslation('profile');
    /**
     * userEditModalIsShow의 상태를 업데이트할 수 있는 setter 함수를 반환
     * atom을 넣는 이유는 atom의 상태를 변경하기 위한 setter 함수를 얻기 위함
     */
    const setUserEditModalIsShow = useSetRecoilState(userEditModalIsShow);
    const {currentUser, logout, currentUserMembership} = useCurrentUser(undefined, {
        orgIdParam: 'orgId',
    });

    if (!currentUser) return <></>;

    return (
        <>
            <UserEditModal />
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
                                    {/*<UserAvatar user={currentUser} roundClass="rounded-lg" />*/}
                                    <UserAvatar
                                        src={currentUser.profileImgUrl}
                                        alt={currentUser.name}
                                        className="w-8 h-8"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{currentUser.name}님</p>
                                        <p className="text-12 text-gray-400">{currentUser.email}</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a
                                    className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-700 hover:text-scordi"
                                    onClick={() => setUserEditModalIsShow(true)}
                                >
                                    <AiOutlineSetting />
                                    <span>{t('dropdown.setting')}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-700 hover:text-scordi"
                                    href="https://scordi.channel.io/lounge"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AiOutlineQuestionCircle />
                                    <span>{t('dropdown.help')}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-700 hover:text-scordi"
                                    onClick={() => router.push('/')}
                                >
                                    <AiOutlineHome />
                                    <span>{t('dropdown.goHomePage')}</span>
                                </a>
                            </li>
                            <li className="" />
                            <li>
                                <a
                                    className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-400 hover:text-scordi"
                                    onClick={() => logout()}
                                >
                                    <BiLogOut />
                                    <span>{t('dropdown.logout')}</span>
                                </a>
                            </li>
                            {currentUser.isAdmin && (
                                <li>
                                    <LinkTo
                                        href={AdminUsersPageRoute.path()}
                                        className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-400 hover:text-scordi"
                                    >
                                        <PiLinkBold />
                                        <span className="flex gap-2 items-center justify-between w-full">
                                            스코디 어드민 <BsArrowRight />
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
