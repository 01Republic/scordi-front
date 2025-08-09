import React, {memo, useState} from 'react';
import {PencilLine} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {SubscriptionDto} from '^models/Subscription/types';
import {CreateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/CreateBillingHistoryByManual.request.dto';
import {ManualBillingHistoryModal} from 'src/clients/private/_modals/ManualBillingHistoryModal';
import {useCreateSubscriptionBillingHistory} from '^models/BillingHistory/hook';
import {errorToast} from '^api/api';

interface BillingHistoryManualUploadProps {
    subscription: SubscriptionDto;
    onSaved?: () => any;
}

export const BillingHistoryManualUpload = memo((props: BillingHistoryManualUploadProps) => {
    const {subscription, onSaved} = props;
    const [isOpen, setIsOpen] = useState(false);

    const {mutateAsync, isPending} = useCreateSubscriptionBillingHistory(subscription.id);

    const onCreate = async (dto: CreateBillingHistoryByManualRequestDto) => {
        if (!dto.subscriptionId) return;
        await mutateAsync(dto)
            .then(() => toast.success('결제내역이 등록되었습니다.'))
            .then(() => onSaved && onSaved())
            .catch(errorToast);
    };

    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)} className="btn btn-sm btn-white gap-2">
                <PencilLine className="size-3.5" />
                직접 추가
            </button>
            <ManualBillingHistoryModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                isLoading={isPending}
                onCreate={onCreate}
                subscription={subscription}
                readonly="구독"
            />
        </>
    );
});
