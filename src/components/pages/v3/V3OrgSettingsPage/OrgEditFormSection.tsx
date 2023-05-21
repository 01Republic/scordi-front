import React, {ForwardedRef, forwardRef, memo, useEffect, useState} from 'react';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {useForm, UseFormReturn} from 'react-hook-form';
import {UpdateOrganizationRequestDto} from '^types/organization.type';
import {EditFormSection} from '^v3/share/EditFormSection';
import {InputText} from '^v3/V3OrgSettingsPage/InputText';
import {useId} from 'react-id-generator';
import DaumPostcode from 'react-daum-postcode';
import {addressModalIsShow, addressValueAtom} from '^v3/share/modals/AddressModal';
import {updateOrganization} from '^api/organization.api';
import {AddressInput} from '^v3/V3OrgSettingsPage/AddressInput';

export const OrgEditFormSection = memo(() => {
    const [currentOrg, setCurrentOrg] = useRecoilState(currentOrgAtom);
    const form = useForm<UpdateOrganizationRequestDto>();
    const [membershipsCount, setMembershipsCount] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (!currentOrg) return;

        form.setValue('name', currentOrg.name);
        if (currentOrg.address) form.setValue('address', currentOrg.address);
        if (currentOrg.addressDetail) form.setValue('addressDetail', currentOrg.addressDetail);
        if (currentOrg.users) setMembershipsCount(currentOrg.users.length);
    }, [currentOrg]);

    if (!currentOrg) return <></>;

    const onSubmit = (data: UpdateOrganizationRequestDto) => {
        updateOrganization(currentOrg.id, data).then((res) => {
            setCurrentOrg(res.data);
            setIsEditMode(false);
        });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <EditFormSection
                title="기본"
                editMode={isEditMode}
                editButton={{onClick: () => setIsEditMode(true)}}
                onCancel={() => setIsEditMode(false)}
            >
                <InputText
                    label="회사명"
                    placeholder="회사명"
                    editable={isEditMode}
                    defaultValue={currentOrg?.name}
                    {...form.register('name', {required: true})}
                />
                <AddressInput editable={isEditMode} form={form} />
                <InputText label="멤버" defaultValue={`${membershipsCount}명`} editable={false} />
            </EditFormSection>
        </form>
    );
});
