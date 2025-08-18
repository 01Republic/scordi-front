import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {VendorContractDto} from '^models/vendor/VendorContract/types';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';

interface VendorContractMemoProps {
    isEditMode?: boolean;
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
    vendorContract: VendorContractDto | undefined;
}

export const VendorContractMemo = memo((props: VendorContractMemoProps) => {
    const {t} = useTranslation('subscription');
    const {isEditMode, form, vendorContract} = props;

    const value = !vendorContract?.memo ? <EmptyValue /> : vendorContract?.memo;

    return (
        <FormControl label={t('detail.businessInfo.memo')}>
            {isEditMode ? (
                <input
                    className="w-full input border-gray-200 bg-gray-100 h-[50px]"
                    defaultValue={vendorContract?.memo || ''}
                    {...form.register('vendorContract.memo')}
                />
            ) : (
                <div className="flex items-center h-[50px] font-normal text-16 text-slate-950">{value}</div>
            )}
            <span />
        </FormControl>
    );
});
