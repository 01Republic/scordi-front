import React, {memo} from 'react';
import {teamMemberApi, TeamMemberDto} from '^models/TeamMember';
import {toast} from 'react-hot-toast';
import {FaSignOutAlt} from 'react-icons/fa';
import {MoreDropdownListItem} from '^v3/share/table/columns/SelectColumn/OptionItem/MoreDropdown/ListItem';
import {confirm2, confirmed} from '^components/util/dialog';
import {membershipApi} from '^models/Membership/api';
import {errorToast} from '^api/api';

interface DeleteMembershipItemProps {
    teamMember: TeamMemberDto;
    reload: () => any;
}

export const DeleteMembershipItem = memo((props: DeleteMembershipItemProps) => {
    const {teamMember, reload} = props;
    const {organizationId} = teamMember;

    const onClick = () => {
        const removeMembershipConfirm = () => {
            return confirm2(
                '워크스페이스에서 내보낼까요?',
                <div className="text-14">
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                    그래도 삭제하시겠어요?
                </div>,
                'warning',
            );
        };

        const removeTeamMemberConfirm = () => {
            return confirm2(
                '구성원 데이터도 함께 삭제할까요?',
                <div className="text-14">
                    <div>
                        <b>워크스페이스</b>에서 내보내더라도
                    </div>
                    <div>구성원을 데이터만 남겨두고 관리 할 수 있습니다.</div>
                    <div>
                        구성원 데이터까지 함께 지우시려면 <b>확인</b>버튼을 클릭해주세요.
                    </div>
                </div>,
                'warning',
            );
        };

        return confirmed(removeMembershipConfirm())
            .then(() => {
                if (!teamMember.membershipId) return;
                return membershipApi.destroy(teamMember.membershipId);
            })
            .then(() => toast.success('워크스페이스에서 내보냈어요.'))
            .then(() => confirmed(removeTeamMemberConfirm(), '워크스페이스에서 내보낸 구성원을 삭제하지 않았습니다.'))
            .then(() => teamMemberApi.destroy(organizationId, teamMember.id))
            .then(() => toast.success('구성원을 삭제했어요.'))
            .catch(errorToast)
            .finally(() => reload());
    };

    return (
        <MoreDropdownListItem onClick={onClick}>
            <div className="flex items-center gap-3 w-full text-red-500 py-1">
                <FaSignOutAlt size={12} />
                <p>워크스페이스에서 내보내기</p>
            </div>
        </MoreDropdownListItem>
    );
});
DeleteMembershipItem.displayName = 'DeleteMembershipItem';
