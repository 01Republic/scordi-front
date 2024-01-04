import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {currentTeamMemberState, useTeamMember} from '^models/TeamMember';
import {TopRightButton} from '^v3/share/modals';
import {isTeamMemberEditModeAtom} from './atom';

interface DeleteButtonProps {
    onFinish?: () => any;
}

export const DeleteButton = memo(function DeleteButton(props: DeleteButtonProps) {
    const [isEditMode, setIsEditMode] = useRecoilState(isTeamMemberEditModeAtom);
    const {deleteMember} = useTeamMember(currentTeamMemberState);
    const {onFinish} = props;

    if (!isEditMode) return <></>;

    const onDeleteConfirm = () => {
        onFinish && onFinish();
        setIsEditMode(false);
    };
    const onDelete = () => deleteMember(onDeleteConfirm);

    return <TopRightButton text="삭제" onClick={() => onDelete()} />;
});
