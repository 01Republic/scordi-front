import React, {memo} from 'react';
import {RotateCcw} from 'lucide-react';
import {TeamMemberDto} from '^models/TeamMember';
import {CheckboxHandler} from '^hooks/useCheckboxHandler';
import {InviteTeamMembers} from './InviteTeamMembers';
import {RemoveTeamMembers} from './RemoveTeamMembers';

interface BottomActionBarProps {
    checkboxHandler: CheckboxHandler<TeamMemberDto>;
    reload: () => void;
}

export const BottomActionBar = memo((props: BottomActionBarProps) => {
    const {checkboxHandler: ch, reload} = props;

    const checkedItems = ch.checkedItems;
    const itemCount = checkedItems.length;
    const onClear = ch.clearAll;

    return (
        <div className="flex justify-center items-center w-full text-14">
            <div className="flex flex-row gap-3 items-center px-6 py-1 bg-white rounded-full border border-gray-300 shadow-lg min-w-md">
                <span className="text-gray-600">{itemCount}개 선택됨</span>

                <InviteTeamMembers checkedItems={checkedItems} onClear={onClear} reload={reload} />

                <RemoveTeamMembers checkedItems={checkedItems} onClear={onClear} reload={reload} />

                <RotateCcw className="text-gray-500 cursor-pointer hover:text-red-400" onClick={onClear} />
            </div>
        </div>
    );
});
