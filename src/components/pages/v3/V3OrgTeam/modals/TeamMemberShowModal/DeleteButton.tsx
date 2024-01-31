import {memo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentTeamMemberState, useTeamMember} from '^models/TeamMember';
import {TopRightButton} from '^v3/share/modals';
import {isTeamMemberEditModeAtom} from './atom';
import {currentUserAtom} from '^models/User/atom';

interface DeleteButtonProps {
    onFinish?: () => any;
}

export const DeleteButton = memo(function DeleteButton(props: DeleteButtonProps) {
    const [isEditMode, setIsEditMode] = useRecoilState(isTeamMemberEditModeAtom);
    const {deleteMember, teamMember} = useTeamMember(currentTeamMemberState);
    const currentUser = useRecoilValue(currentUserAtom);

    const {onFinish} = props;

    const isMe = teamMember?.email === currentUser?.email;

    if (!isEditMode) return <></>;
    if (isMe) return <></>;

    const onDeleteConfirm = () => {
        onFinish && onFinish();
        setIsEditMode(false);
    };

    const onDelete = () => {
        if (!teamMember) return;

        deleteMember(onDeleteConfirm, teamMember);
    };

    return <TopRightButton text="삭제" onClick={() => onDelete()} />;
});
