import React, {memo} from 'react';
import {NewBillingHistoryModalGroup} from '^v3/share/modals/NewBillingHistoryModal/NewBillingHistoryModalGroup';

interface Props {
    onClose?: () => any;
    onFinish?: () => any;
}

export const NewBillingHistoryModal = memo((props: Props) => {
    const {onClose, onFinish} = props;

    return <NewBillingHistoryModalGroup onClose={onClose} onFinish={onFinish} />;
});
