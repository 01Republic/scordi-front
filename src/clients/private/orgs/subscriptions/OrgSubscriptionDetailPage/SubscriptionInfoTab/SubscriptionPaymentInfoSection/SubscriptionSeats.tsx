import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface SubscriptionSeatsProps {
    isEditMode?: boolean;
    setUpdateSeatCount: (value: number) => void;
    currentSeatCount: number;
    currentAssignedSeatCount: number;
}

export const SubscriptionSeats = memo((props: SubscriptionSeatsProps) => {
    const {t} = useTranslation('subscription');
    const {isEditMode, currentSeatCount, currentAssignedSeatCount, setUpdateSeatCount} = props;

    return (
        <FormControl label={t('detail.paymentInfo.purchaseQuantity')}>
            {isEditMode ? (
                <div className="relative">
                    <input
                        className="input border-gray-200 bg-gray-100 w-full flex flex-col justify-center"
                        defaultValue={currentSeatCount}
                        type="string"
                        onWheel={(e) => e.preventDefault()}
                        onChange={(e) => {
                            const value = e.target.value.toString().replace(/\D/g, '');
                            e.target.value = value.toString();
                            if (value) setUpdateSeatCount(Number(value));
                        }}
                    />
                    <div className="flex items-center absolute right-2 top-0 bottom-0 text-12 text-gray-500">
                        {t('detail.paymentInfo.assignedHold', {
                            assigned: currentAssignedSeatCount,
                            total: currentSeatCount,
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">{currentSeatCount}</div>
            )}
            <span />
        </FormControl>
    );
});
