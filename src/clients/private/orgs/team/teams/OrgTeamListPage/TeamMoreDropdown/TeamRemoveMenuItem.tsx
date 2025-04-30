import {memo} from 'react';
import {Trash2} from 'lucide-react';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {TeamDto} from '^models/Team/type';
import {confirm2, confirmed} from '^components/util/dialog';
import {teamApi} from '^models/Team/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface TeamRemoveMenuItemProps {
    team: TeamDto;
    reload?: () => any;
}

export const TeamRemoveMenuItem = memo((props: TeamRemoveMenuItemProps) => {
    const {team, reload} = props;

    const onClick = () => {
        const removeConfirm = () => {
            return confirm2(
                <span className="text-20">
                    <span className="text-scordi">{team.name}</span>팀을 삭제할까요?
                </span>,
                <div className="text-16 -mt-4 -mx-2 px-[10px]">
                    <div>팀과 관련된 모든 정보를 삭제합니다.</div>
                    <div className="mb-4">이 작업은 되돌릴 수 없어요.</div>
                    <div>지금 삭제할까요?</div>
                </div>,
            );
        };

        return confirmed(removeConfirm())
            .then(() => teamApi.destroy(team.organizationId, team.id))
            .then(() => toast.success('삭제했어요.'))
            .then(() => reload && reload())
            .catch(errorToast);
    };

    return (
        <MoreDropdown.MenuItem onClick={onClick} className="flex items-center gap-2 text-red-400 hover:text-red-500">
            <Trash2 />
            <div>삭제하기</div>
        </MoreDropdown.MenuItem>
    );
});
TeamRemoveMenuItem.displayName = 'TeamRemoveMenuItem';
