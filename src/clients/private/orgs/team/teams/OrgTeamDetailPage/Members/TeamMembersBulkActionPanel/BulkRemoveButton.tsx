import React, {memo} from 'react';
import {useTranslation} from 'next-i18next';
import {CheckboxHandler} from '^hooks/useCheckboxHandler';
import {TeamMembershipDto} from '^models/TeamMembership/type';
import {confirm2, confirmed} from '^components/util/dialog';
import {teamMembershipApi} from '^models/TeamMembership/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {useOrgIdParam} from '^atoms/common';

interface BulkRemoveButtonProps {
    checkboxHandler: CheckboxHandler<TeamMembershipDto>;
    reload?: () => any;
}

export const BulkRemoveButton = memo((props: BulkRemoveButtonProps) => {
    const {t} = useTranslation('teams');
    const orgId = useOrgIdParam();
    const {checkboxHandler, reload} = props;
    const {checkedItems} = checkboxHandler;
    const checkedCount = checkedItems.length;
    const countStr = checkedCount.toLocaleString();

    const onClick = () => {
        const deleteConfirm = () => {
            return confirm2(
                `${countStr}${t('members.bulkAction.confirmRemove')}`,
                <span>
                    {t('members.removeMemberDialog.warning')}
                    <br />
                    <b>{t('members.removeMemberDialog.excluded')}</b>
                    <br />
                    {t('members.removeMemberDialog.confirm')}
                </span>,
                'warning',
            );
        };

        confirmed(deleteConfirm())
            .then(() => {
                return teamMembershipApi.destroyAll(
                    orgId,
                    checkedItems.map((item) => ({
                        teamId: item.teamId,
                        teamMemberId: item.teamMemberId,
                    })),
                );
            })
            .then(() => toast.success(`${countStr}${t('members.bulkAction.removed')}`))
            .then(() => reload && reload())
            .catch(errorToast);
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className="btn btn-xs btn-gray btn-outline normal-case no-animation btn-animation"
        >
            {t('members.removeMember')}
        </button>
    );
});
BulkRemoveButton.displayName = 'BulkRemoveButton';
