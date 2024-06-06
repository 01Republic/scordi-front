import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {MonoSelectInput} from '^components/ui/inputs/MonoSelect/MonoSelectInput';
import {VendorCompanyDto} from '^models/VendorCompany/type';
import {VendorManagerDto} from '^models/VendorManager/type';
import {createSubscriptionFormData} from '../../atom';
import {InputSection} from '../InputSection';
import {VendorCompanySelectModal} from './VendorCompanySelectModal';
import {VendorManagerSelectModal} from './VendorManagerSelectModal';
import {useVendorCompanyListInCreateSubscription} from '^models/VendorCompany/hook';
import {useVendorManagerListInCreateSubscription} from '^models/VendorManager/hook';

export const PartnerCompanySelect = memo(function PartnerCompanySelect() {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);
    const [isCompanySelectModalOpened, setIsCompanySelectModalOpened] = useState(false);
    const [isManagerSelectModalOpened, setIsManagerSelectModalOpened] = useState(false);
    const {result: searchedCompany} = useVendorCompanyListInCreateSubscription();
    const {result: searchedManager} = useVendorManagerListInCreateSubscription();
    const [selectedCompany, setSelectedCompany] = useState<VendorCompanyDto>();
    const [selectedManager, setSelectedManager] = useState<VendorManagerDto>();

    useEffect(() => {
        const defaultCompany = searchedCompany.items.find((o) => o.id === formData.vendorCompanyId);
        setSelectedCompany(defaultCompany);

        const defaultManager = searchedManager.items.find((o) => o.id === formData.vendorManagerId);
        setSelectedManager(defaultManager);
    }, []);

    const onCompanyChange = (vendorCompany?: VendorCompanyDto) => {
        setSelectedCompany(vendorCompany);
        setFormData((f) => ({
            ...f,
            vendorCompanyId: vendorCompany?.id,
            vendorManagerId: vendorCompany && vendorCompany.id === f.vendorCompanyId ? f.vendorManagerId : undefined,
        }));
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
        setFormData((f) => ({
            ...f,
            vendorManagerId: vendorManager?.id,
        }));
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
                <label>
                    <p className="text-11 text-gray-500 mb-1">담당자</p>
                    <MonoSelectInput
                        openModal={() => setIsManagerSelectModalOpened(true)}
                        clearable
                        selectedOption={selectedManager}
                        getLabel={(vendorManager) => vendorManager.name}
                        placeholder="선택되지 않았아요."
                        clearOption={() => onManagerChange(undefined)}
                    />
                </label>
            </div>

            <VendorCompanySelectModal
                isOpened={isCompanySelectModalOpened}
                onClose={() => setIsCompanySelectModalOpened(false)}
                vendorCompanyId={formData.vendorCompanyId}
                onSelect={onCompanyChange}
            />

            <VendorManagerSelectModal
                isOpened={isManagerSelectModalOpened}
                onClose={() => setIsManagerSelectModalOpened(false)}
                selectedCompany={selectedCompany}
                vendorManagerId={formData.vendorManagerId}
                onSelect={onManagerChange}
            />
        </InputSection>
    );
});
