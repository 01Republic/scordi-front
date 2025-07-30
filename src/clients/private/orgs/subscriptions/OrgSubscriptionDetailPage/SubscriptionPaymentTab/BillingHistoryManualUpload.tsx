import React, {memo, useState} from 'react';
import {PencilLine} from 'lucide-react';
import {SubscriptionDto} from '^models/Subscription/types';
import {ManualBillingHistoryModal} from 'src/clients/private/_modals/ManualBillingHistoryModal';

interface BillingHistoryManualUploadProps {
    subscription: SubscriptionDto;
}

export const BillingHistoryManualUpload = memo((props: BillingHistoryManualUploadProps) => {
    const {subscription} = props;
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)} className="btn btn-sm btn-white gap-2">
                <PencilLine className="size-3.5" />
                직접 추가
            </button>
            <ManualBillingHistoryModal isOpen={isOpen} onClose={() => setIsOpen(false)} subscription={subscription} />
        </>
    );
});
