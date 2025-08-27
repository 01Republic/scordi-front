import React, {memo} from 'react';
import {BottomActionBar} from './BottomActionBar';
import {CheckboxHandler} from '^hooks/useCheckboxHandler';
import {TeamMemberDto} from '^models/TeamMember';

interface BottomActionProps {
    checkboxHandler: CheckboxHandler<TeamMemberDto>;
}

export const BottomAction = memo((props: BottomActionProps) => {
    const {checkboxHandler} = props;

    if (checkboxHandler.checkedItems.length === 0) return <></>;

    return (
        <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center pointer-events-none">
            <div className="container px-4 pointer-events-auto">
                <BottomActionBar checkboxHandler={checkboxHandler} />
            </div>
        </div>
    );
});
