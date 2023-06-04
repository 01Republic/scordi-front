import {memo} from 'react';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {UserAvatar} from '^v3/share/UserAvatar';
import {AiOutlineSetting} from '@react-icons/all-files/ai/AiOutlineSetting';
import {AiOutlineQuestionCircle} from '@react-icons/all-files/ai/AiOutlineQuestionCircle';
import {BiLogOut} from '@react-icons/all-files/bi/BiLogOut';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {userEditModalIsShow} from '^v3/share/modals/UserEditModal';
import {MembershipLevel} from '^types/membership.type';
import {V3OrgSettingsOrgPageRoute} from '^pages/v3/orgs/[orgId]/settings/org';
import {useRouter} from 'next/router';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {AiOutlineHome} from '@react-icons/all-files/ai/AiOutlineHome';

export const TopNavProfileButton = memo(() => {
    const router = useRouter();
    const currentOrg = useRecoilValue(currentOrgAtom);
    const setUserEditModalIsShow = useSetRecoilState(userEditModalIsShow);
    const {currentUser, logout, currentUserMembership} = useCurrentUser(undefined, {
        orgIdParam: 'orgId',
    });

    if (!currentOrg || !currentUser || !currentUserMembership) return <></>;

    const isOwner = currentUserMembership.level === MembershipLevel.OWNER;

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="cursor-pointer px-2">
                <UserAvatar user={currentUser} roundClass="rounded-lg" />
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
                        onClick={() => setUserEditModalIsShow(true)}
                    >
                        <AiOutlineSetting />
                        <span>설정</span>
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
                        <span>고객센터</span>
                    </a>
                </li>
                <li>
                    <a
                        className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-700 hover:text-scordi"
                        onClick={() => router.push('/')}
                    >
                        <AiOutlineHome />
                        <span>스코디 홈페이지로 이동</span>
                    </a>
                </li>
                {isOwner && (
                    <>
                        <li className="" />
                        <li>
                            <a
                                className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-700 hover:text-scordi"
                                onClick={() => router.push(V3OrgSettingsOrgPageRoute.path(currentOrg.id))}
                            >
                                <AiOutlineSetting />
                                <span>조직 설정</span>
                            </a>
                        </li>
                    </>
                )}
                <li className="" />
                <li>
                    <a
                        className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-400 hover:text-scordi"
                        onClick={() => logout()}
                    >
                        <BiLogOut />
                        <span>로그아웃</span>
                    </a>
                </li>
            </ul>
        </div>
    );
});
