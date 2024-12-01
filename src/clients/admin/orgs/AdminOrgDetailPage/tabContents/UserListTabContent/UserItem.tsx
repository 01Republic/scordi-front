import {memo, useState} from 'react';
import {Avatar} from '^components/Avatar';
import {CardTableTR} from '^admin/share';
import {UserDto} from '^models/User/types';
import {AdminUserPageRoute} from '^pages/admin/users/[id]';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {ChangeOrgModal} from './ChangeOrgModal';

interface UserItemProps {
    user: UserDto;
    orgId: number;
    borderBottom?: boolean;
}

export const UserItem = memo((props: UserItemProps) => {
    const {user, orgId} = props;

    const membership = (user.memberships || []).find((m) => m.organizationId === orgId);
    const detailPath = AdminUserPageRoute.path(user.id);
    const [isOpened, setIsOpened] = useState(false);

    return (
        <>
            <CardTableTR gridClass="grid-cols-5">
                {/* image, profile */}
                <div>
                    <div className="flex gap-2 items-center">
                        <Avatar src={user.profileImgUrl} className="w-[32px]" />
                        <p className="text-left whitespace-nowrap">
                            <span className="text-xs text-gray-500 mr-1">(#{user.id})</span>
                            <span className="">{user.name}</span>
                        </p>
                    </div>
                </div>

                {/* membership level */}
                <div>{membership?.level}</div>

                {/* 가입일시 */}
                <div>
                    <span className="whitespace-nowrap">{user.createdAt.toLocaleString()}</span>
                </div>

                {/* 수정일시 */}
                <div>
                    <span className="whitespace-nowrap">{user.updatedAt.toLocaleString()}</span>
                </div>

                {/* actions */}
                <div className="flex gap-2 items-center">
                    <MoreDropdown Trigger={() => <button className="btn btn-sm btn-scordi">더보기</button>}>
                        {({hide}) => {
                            return (
                                <MoreDropdown.Content>
                                    <li>
                                        <MoreDropdown.ItemButton href={detailPath} className="hover:bg-scordi-50">
                                            보기
                                        </MoreDropdown.ItemButton>
                                    </li>
                                    <li>
                                        <MoreDropdown.ItemButton>수정</MoreDropdown.ItemButton>
                                    </li>
                                    <li>
                                        <MoreDropdown.ItemButton>삭제</MoreDropdown.ItemButton>
                                    </li>
                                    <li>
                                        <MoreDropdown.ItemButton
                                            onClick={() => {
                                                hide();
                                                setIsOpened(true);
                                            }}
                                        >
                                            조직 변경
                                        </MoreDropdown.ItemButton>
                                    </li>
                                </MoreDropdown.Content>
                            );
                        }}
                    </MoreDropdown>
                </div>
            </CardTableTR>
            {membership && (
                <ChangeOrgModal
                    membership={membership}
                    isOpened={isOpened}
                    onClose={() => {
                        setIsOpened(false);
                    }}
                />
            )}
        </>
    );
});
