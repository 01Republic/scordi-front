import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {MonoSelectInput} from '^components/ui/inputs/MonoSelect/MonoSelectInput';
import {VendorCompanyDto} from '^models/vendor/VendorCompany/type';
import {VendorManagerDto} from '^models/vendor/VendorManager/type';
import {createSubscriptionFormData} from '../../atom';
import {InputSection} from '../InputSection';
import {VendorCompanySelectModal} from './VendorCompanySelectModal';
import {VendorManagerSelectModal} from './VendorManagerSelectModal';
import {useVendorCompanyListInCreateSubscription} from '^models/vendor/VendorCompany/hook';
import {useVendorManagerListInCreateSubscription} from '^models/vendor/VendorManager/hook';
import {VendorManagerProfile} from '^models/vendor/VendorManager/components/VendorManagerProfile';

export const PartnerCompanySelect = memo(function PartnerCompanySelect() {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
    const [isCompanySelectModalOpened, setIsCompanySelectModalOpened] = useState(false);
    const [isManagerSelectModalOpened, setIsManagerSelectModalOpened] = useState(false);
    const {result: searchedCompany} = useVendorCompanyListInCreateSubscription();
    const {result: searchedManager} = useVendorManagerListInCreateSubscription();
    const [selectedCompany, setSelectedCompany] = useState<VendorCompanyDto>();
    const [selectedManager, setSelectedManager] = useState<VendorManagerDto>();
    const [isSelectVendorCompany, setIsSelectVendorCompany] = useState<boolean | null>(null);

    useEffect(() => {
        const defaultCompany = searchedCompany.items.find((o) => o.id === formData.vendorContract?.vendorCompanyId);
        setSelectedCompany(defaultCompany);

        const defaultManager = searchedManager.items.find((o) => o.id === formData.vendorContract?.vendorManagerId);
        setSelectedManager(defaultManager);

        if (selectedCompany) {
            setIsSelectVendorCompany(false);
        }
    }, [selectedCompany]);

    const onCompanyChange = (vendorCompany?: VendorCompanyDto) => {
        setSelectedCompany(vendorCompany);
        setFormData((f) => {
            const vendorCompanyId = vendorCompany?.id;
            const vendorManagerId =
                vendorCompany && vendorCompany.id === f.vendorContract?.vendorCompanyId
                    ? f.vendorContract?.vendorManagerId
                    : undefined;

            return {...f, vendorContract: {vendorCompanyId, vendorManagerId}};
        });
        if (vendorCompany) {
            const isChanged = vendorCompany.id !== selectedCompany?.id;
            if (isChanged) setSelectedManager(undefined);
            setIsManagerSelectModalOpened(true);
        } else {
            setSelectedManager(undefined);
        }
    };

    const onManagerChange = (vendorManager?: VendorManagerDto) => {
        setSelectedManager(vendorManager);
        setFormData((f) => {
            const vendorCompanyId = vendorManager?.vendorCompanyId || f.vendorContract?.vendorCompanyId;
            const vendorManagerId = vendorManager?.id;
            return {...f, vendorContract: {vendorCompanyId, vendorManagerId}};
        });
    };

    const checkVendorCompany = () => {
        if (!selectedCompany) {
            setIsSelectVendorCompany(true);
        } else {
            setIsSelectVendorCompany(false);
        }
    };

    return (
        <InputSection>
            <div className="form-control mb-4">
                <label>
                    <p className="text-11 text-gray-500 mb-1">파트너사</p>
                    <MonoSelectInput
                        openModal={() => setIsCompanySelectModalOpened(true)}
                        clearable
                        selectedOption={selectedCompany}
                        getLabel={(vendorCompany) => vendorCompany.name}
                        placeholder="선택되지 않았아요."
                        clearOption={() => onCompanyChange(undefined)}
                    />
                </label>
            </div>

            <div className="form-control">
                <label onClick={checkVendorCompany}>
                    <p className="text-11 text-gray-500 mb-1">담당자</p>
                    <MonoSelectInput
                        openModal={() => setIsManagerSelectModalOpened(!!selectedCompany)}
                        clearable
                        selectedOption={selectedManager}
                        getLabel={(vendorManager) => (
                            <VendorManagerProfile item={vendorManager} avatarClass="w-8 h-8" />
                        )}
                        placeholder="담당자를 선택해주세요"
                        clearOption={() => onManagerChange(undefined)}
                    />
                    {isSelectVendorCompany && <p className="text-error p-1">파트너사를 먼저 선택해주세요.</p>}
                </label>
            </div>

            <VendorCompanySelectModal
                isOpened={isCompanySelectModalOpened}
                onClose={() => setIsCompanySelectModalOpened(false)}
                vendorCompanyId={formData.vendorContract?.vendorCompanyId}
                onSelect={onCompanyChange}
            />

            <VendorManagerSelectModal
                isOpened={isManagerSelectModalOpened}
                onClose={() => setIsManagerSelectModalOpened(false)}
                selectedCompany={selectedCompany}
                vendorManagerId={formData.vendorContract?.vendorManagerId}
                onSelect={onManagerChange}
            />
        </InputSection>
    );
});
