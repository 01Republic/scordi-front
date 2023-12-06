import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {TopRightButton} from '^v3/share/modals';
import {isTeamMemberEditModeAtom} from './atom';

export const EditButton = memo(function EditButton() {
    const [isEditMode, setIsEditMode] = useRecoilState(isTeamMemberEditModeAtom);

    if (isEditMode) return <></>;

    return <TopRightButton text="수정" onClick={() => setIsEditMode(true)} />;
});
