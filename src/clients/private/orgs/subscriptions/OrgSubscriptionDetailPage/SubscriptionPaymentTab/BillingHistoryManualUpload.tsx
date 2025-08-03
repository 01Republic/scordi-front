import React, {memo, useState} from 'react';
import {PencilLine} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {SubscriptionDto} from '^models/Subscription/types';
import {CreateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/CreateBillingHistoryByManual.request.dto';
import {ManualBillingHistoryModal} from 'src/clients/private/_modals/ManualBillingHistoryModal';
import {useCreateSubscriptionBillingHistory} from '^models/BillingHistory/hook';

interface BillingHistoryManualUploadProps {
    subscription: SubscriptionDto;
}

export const BillingHistoryManualUpload = memo((props: BillingHistoryManualUploadProps) => {
    const {subscription} = props;
    const [isOpen, setIsOpen] = useState(false);

    const {mutateAsync, isPending} = useCreateSubscriptionBillingHistory();

    const onCreate = async (dto: CreateBillingHistoryByManualRequestDto) => {
        if (!dto.subscriptionId) return;
        await mutateAsync({
            subscriptionId: dto.subscriptionId,
            dto: {
                ...dto,
            },
        }).then(() => toast.success('결제내역이 등록되었습니다.'));
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
