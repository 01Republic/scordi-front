import React, {memo} from 'react';
import {isAddingModeState} from './atom';
import {useSetRecoilState} from 'recoil';
import {FaPlus} from 'react-icons/fa6';
import {Avatar} from '^components/Avatar';

export const AddNewMemberButton = memo(() => {
    const setAddingMode = useSetRecoilState(isAddingModeState);

    return (
        <div
            onClick={() => setAddingMode(true)}
            className="!w-auto gap-4 px-4 py-3 -mx-4 hover:bg-white no-selectable text-scordi transition-all underline"
        >
            <Avatar className="w-9 h-9 outline outline-offset-1 outline-slate-100">
                <FaPlus size={24} className="text-gray-400 h-full w-full p-[6px]" />
            </Avatar>

            <div className="flex-1">
                <p className="font-semibold text-sm">혹시 누락된 구성원이 더 있나요?</p>
            </div>
        </div>
    );
});
AddNewMemberButton.displayName = 'AddNewMemberButton';
