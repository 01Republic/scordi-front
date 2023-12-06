import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useToast} from '^hooks/useToast';
import {currentTeamMemberState, useEditTeamMember} from '^models/TeamMember';
import {TopRightButton} from '^v3/share/modals';
import {isTeamMemberEditModeAtom} from './atom';

export const DeleteButton = memo(function DeleteButton() {
    const isEditMode = useRecoilValue(isTeamMemberEditModeAtom);
    const currentMember = useRecoilValue(currentTeamMemberState);
    const {deleteFn} = useEditTeamMember();
    const {toast} = useToast();

    if (!isEditMode) return <></>;

    return (
        <TopRightButton
            text="삭제"
            onClick={() => (currentMember ? deleteFn(currentMember) : toast.error('알 수 없는 멤버'))}
        />
    );
});
