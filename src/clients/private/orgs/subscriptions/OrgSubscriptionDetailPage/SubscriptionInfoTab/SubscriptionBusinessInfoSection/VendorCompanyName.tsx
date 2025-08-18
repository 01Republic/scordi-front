import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {VendorCompanySelectModal} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PartnerCompanySelect/VendorCompanySelectModal';
import {EmptyValue} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/EmptyValue';
import {VendorCompanyDto} from '^models/vendor/VendorCompany/type';
import {VendorContractDto} from '^models/vendor/VendorContract/types';
import {VendorManagerDto} from '^models/vendor/VendorManager/type';
import {X} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo, useState} from 'react';

interface VendorCompanyNameProps {
    isEditMode?: boolean;
    vendorContract: VendorContractDto | undefined;
    selectedCompany: VendorCompanyDto | undefined;
    selectedManager: VendorManagerDto | undefined;
    onCompanyChange: (vendorCompany?: VendorCompanyDto) => void;
}

export const VendorCompanyName = memo((props: VendorCompanyNameProps) => {
    const {t} = useTranslation('subscription');
    const {isEditMode, vendorContract, selectedCompany, onCompanyChange} = props;
    const [isCompanySelectModalOpened, setIsCompanySelectModalOpened] = useState(false);

    return (
        <FormControl label={t('detail.businessInfo.company')}>
            {isEditMode ? (
                <div
                    className="cursor-pointer input border-gray-200 bg-gray-100 w-full flex items-center justify-between"
                    onClick={() => setIsCompanySelectModalOpened(true)}
                >
                    <div>{selectedCompany?.name || <EmptyValue />}</div>
                    {selectedCompany && (
                        <X
                            size={16}
                            className="cursor-pointer text-gray-400 hover:text-gray-800 transition-all"
                            onClick={(e) => {
                                onCompanyChange(undefined);
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                        />
                    )}
                </div>
            ) : (
                <div className="flex items-center" style={{height: '49.5px'}}>
                    {vendorContract?.vendorCompany?.name || <EmptyValue />}
                </div>
            )}
            <span />

            <VendorCompanySelectModal
                isOpened={isCompanySelectModalOpened}
                onClose={() => setIsCompanySelectModalOpened(false)}
                vendorCompanyId={vendorContract?.vendorCompany?.id || undefined}
                onSelect={onCompanyChange}
            />
        </FormControl>
    );
});
