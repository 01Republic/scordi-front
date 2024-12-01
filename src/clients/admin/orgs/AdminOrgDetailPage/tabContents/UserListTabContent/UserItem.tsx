import {memo, useState} from 'react';
import {Avatar} from '^components/Avatar';
import {CardTableTR} from '^admin/share';
import {MembershipDto, MembershipLevel} from '^models/Membership/types';
import {AdminUserPageRoute} from '^pages/admin/users/[id]';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {hh_mm, yyyy_mm_dd} from '^utils/dateTime';
import {MembershipLevelDropdown} from '^models/Membership/components';
import {membershipApi} from '^models/Membership/api';
import {errorToast} from '^api/api';
import {toast} from 'react-hot-toast';

interface UserItemProps {
    membership: MembershipDto;
    borderBottom?: boolean;
    reload?: () => any;
    openChangeOrgModal: () => any;
}

export const UserItem = memo((props: UserItemProps) => {
    const {membership, reload, openChangeOrgModal} = props;

    const user = membership.user;
    const detailPath = membership.userId ? AdminUserPageRoute.path(membership.userId) : '';

    const remove = () => {
        if (!confirm('정말 삭제할까요?\n관리자 권한으로 삭제하므로 이 작업은 복구가 불가능합니다.')) return;
        membershipApi
            .destroy(membership.id)
            .then(() => toast.success('삭제했습니다.'))
            .then(() => reload && reload())
            .catch(errorToast);
    };

    return (
        <CardTableTR gridClass="grid-cols-6">
            {/* 멤버십 id */}
            <div>{membership.id}</div>

            {/* 회원 */}
            <div>
                {user ? (
                    <div className="flex gap-2 items-center">
                        <Avatar src={user.profileImgUrl} className="w-6 h-6" />
                        <div className="leading-none">
                            <p className="text-left whitespace-nowrap leading-none">
                                <span className="text-xs text-gray-500 mr-1">(#{user.id})</span>
                                <span className="">{user.name}</span>
                            </p>
                            <p className="leading-none text-12 text-gray-400">{user.email}</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-14 text-gray-400">
                        {membership.invitedEmail ? (
                            <div className="leading-none">
                                <div className="text-10">초대 수락 대기중</div>
                                <div className="text-12">{membership.invitedEmail}</div>
                            </div>
                        ) : (
                            <div className="text-red-500" onClick={() => console.log(membership)}>
                                알 수 없음
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 권한 */}
            <div>
                <MembershipLevelDropdown
                    membership={membership}
                    reload={reload}
                    levelOptions={[MembershipLevel.MEMBER, MembershipLevel.OWNER, MembershipLevel.ADMIN]}
                />
            </div>

            {/* 조직 가입 승인상태 */}
            <div>{membership.approvalStatus}</div>

            {/* 가입일시 */}
            <div>
                <div className="text-12 flex items-center gap-1.5">
                    <span>{yyyy_mm_dd(membership.createdAt, '. ')}</span>
                    <span>{hh_mm(membership.createdAt)}</span>
                </div>
            </div>

            {/* actions */}
            <div className="flex gap-2 items-center">
                <MoreDropdown
                    Trigger={() => <button className="btn btn-sm btn-scordi no-animation btn-animation">더보기</button>}
                >
                    {({hide}) => (
                        <MoreDropdown.Content className="!py-0">
                            <li>
                                <MoreDropdown.ItemButton href={detailPath} className="hover:bg-scordi-50">
                                    보기
                                </MoreDropdown.ItemButton>
                            </li>
                            <li>
                                <MoreDropdown.ItemButton>수정</MoreDropdown.ItemButton>
                            </li>
                            <li>
                                <MoreDropdown.ItemButton
                                    onClick={() => {
                                        hide();
                                        openChangeOrgModal();
                                    }}
                                >
                                    조직 변경
                                </MoreDropdown.ItemButton>
                            </li>
                            <li className="divider m-0" />
                            <li>
                                <MoreDropdown.ItemButton
                                    text="삭제"
                                    onClick={remove}
                                    className="text-red-500 hover:bg-red-50"
                                />
                            </li>
                        </MoreDropdown.Content>
                    )}
                </MoreDropdown>
            </div>
        </CardTableTR>
    );
});
