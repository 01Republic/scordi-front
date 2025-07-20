import React, {memo} from 'react';
import {useTranslation} from 'next-i18next';
import {CheckboxHandler} from '^hooks/useCheckboxHandler';
import {TeamMembershipDto} from '^models/TeamMembership/type';
import {BulkRemoveButton} from './BulkRemoveButton';

interface TeamMembersBulkActionPanelProps {
    checkboxHandler: CheckboxHandler<TeamMembershipDto>;
    reload?: () => any;
}

export const TeamMembersBulkActionPanel = memo((props: TeamMembersBulkActionPanelProps) => {
    const {t} = useTranslation('teams');
    const {checkboxHandler: ch, reload} = props;

    return (
        <div className="flex items-center mb-4">
            <div className="flex items-center gap-3">
                <div className="text-14 text-gray-500">
                    {t('members.bulkAction.selected')} {ch.checkedItems.length.toLocaleString()}
                    {t('members.bulkAction.items')}
                </div>

                <div className="flex items-center gap-2">
                    <BulkRemoveButton checkboxHandler={ch} reload={reload} />
                </div>
            </div>
        </div>
    );
});
TeamMembersBulkActionPanel.displayName = 'TeamMembersBulkActionPanel';
