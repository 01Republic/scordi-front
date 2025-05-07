import React, {memo} from 'react';
import {CheckboxHandler} from '^hooks/useCheckboxHandler';
import {TeamMembershipDto} from '^models/TeamMembership/type';
import {BulkRemoveButton} from './BulkRemoveButton';

interface TeamMembersBulkActionPanelProps {
    checkboxHandler: CheckboxHandler<TeamMembershipDto>;
    reload?: () => any;
}

export const TeamMembersBulkActionPanel = memo((props: TeamMembersBulkActionPanelProps) => {
    const {checkboxHandler: ch, reload} = props;

    return (
        <div className="flex items-center mb-4">
            <div className="flex items-center gap-3">
                <div className="text-14 text-gray-500">
                    선택된 {ch.checkedItems.length.toLocaleString()}개의 항목을:
                </div>

                <div className="flex items-center gap-2">
                    <BulkRemoveButton checkboxHandler={ch} reload={reload} />
                </div>
            </div>
        </div>
    );
});
TeamMembersBulkActionPanel.displayName = 'TeamMembersBulkActionPanel';
