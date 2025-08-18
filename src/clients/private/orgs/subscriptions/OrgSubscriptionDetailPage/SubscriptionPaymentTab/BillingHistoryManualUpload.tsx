import {useCreateSubscriptionBillingHistory} from '^models/BillingHistory/hook';
import {CreateBillingHistoryByManualRequestDto} from '^models/BillingHistory/type/CreateBillingHistoryByManual.request.dto';
import {SubscriptionDto} from '^models/Subscription/types';
import {PencilLine} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';
import {toast} from 'react-hot-toast';
import {ManualBillingHistoryModal} from 'src/clients/private/_modals/ManualBillingHistoryModal';

interface BillingHistoryManualUploadProps {
    subscription: SubscriptionDto;
}

export const BillingHistoryManualUpload = memo((props: BillingHistoryManualUploadProps) => {
    const {subscription} = props;
    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation('subscription');

    const {mutateAsync, isPending} = useCreateSubscriptionBillingHistory();

    const onCreate = async (dto: CreateBillingHistoryByManualRequestDto) => {
        if (!dto.subscriptionId) return;
        await mutateAsync({
            subscriptionId: dto.subscriptionId,
            dto: {
                ...dto,
            },
        }).then(() => toast.success(t('detail.paymentTab.manualUpload.success')));
    };

    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)} className="btn btn-sm btn-white gap-2">
                <PencilLine className="size-3.5" />
                {t('detail.paymentTab.manualUpload.button')}
            </button>
            <ManualBillingHistoryModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                isLoading={isPending}
                onCreate={onCreate}
                subscription={subscription}
                readonly={t('detail.paymentTab.manualUpload.readonly')}
            />
        </>
    );
});
