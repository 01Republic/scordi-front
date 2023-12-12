import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {isAddingModeState} from './atom';
import {AddNewMemberButton} from './AddNewMemberButton';
import {NewMemberInput} from './NewMemberInput';

export const AddNewMemberService = memo(() => {
    const isAddingMode = useRecoilValue(isAddingModeState);

    return <li className="px-4">{isAddingMode ? <NewMemberInput /> : <AddNewMemberButton />}</li>;
});
AddNewMemberService.displayName = 'AddNewMember';
