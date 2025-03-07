import React, {memo} from 'react';
import {useModal} from '^v3/share/modals';
import {newTeamMemberModal} from '^v3/share/modals/NewTeamMemberModal/atom';
import {Plus} from 'lucide-react';

export const AddMemberButton2 = memo(() => {
    const {open} = useModal(newTeamMemberModal);

    return (
        <button
            onClick={open}
            className="btn btn-scordi m-1 gap-2 whitespace-nowrap flex-nowrap mt-8 md:mt-0 btn-lg md:btn-md w-full md:w-auto"
        >
            멤버 등록 <Plus />
        </button>
    );
});
