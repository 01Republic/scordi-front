import React, {memo} from 'react';
import {NewBillingHistoryModalGroup} from '^v3/share/modals/NewBillingHistoryModal/NewBillingHistoryModalGroup';

interface Props {
    onClose?: () => any;
}

export const NewBillingHistoryModal = memo((props: Props) => {
    const {onClose} = props;

    return <NewBillingHistoryModalGroup onClose={onClose} />;
});
