import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {isAddingModeState} from './atom';
import {useSetRecoilState} from 'recoil';
import {Avatar} from '^components/Avatar';
import {MdOutlineWatchLater} from 'react-icons/md';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {FaPlus, FaUserPlus} from 'react-icons/fa6';

export const AddNewMemberButton = memo(() => {
    const setAddingMode = useSetRecoilState(isAddingModeState);

    // return (
    //     <LinkTo
    //         href="#"
    //         onClick={() => setAddingMode(true)}
    //         className="btn btn-block rounded-box btn-scordi-light-200 !text-gray-600 btn-lg my-4"
    //     >
    //         혹시 누락된 구성원이 더 있나요?
    //     </LinkTo>
    // );
    return (
        <div
            onClick={() => setAddingMode(true)}
            className="!w-auto gap-4 px-4 py-3 -mx-4 hover:bg-white no-selectable text-scordi transition-all underline"
        >
            <span className="avatar-default w-9 h-9 outline outline-offset-1 outline-slate-100">
                <FaPlus size={24} className="text-gray-400 h-full w-full p-[6px]" />
            </span>

            <div className="flex-1">
                <p className="font-semibold text-sm">혹시 누락된 구성원이 더 있나요?</p>
            </div>
        </div>
    );
});
AddNewMemberButton.displayName = 'AddNewMemberButton';
