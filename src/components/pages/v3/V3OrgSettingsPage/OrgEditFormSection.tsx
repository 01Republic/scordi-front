import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {useForm} from 'react-hook-form';
import {UpdateOrganizationRequestDto} from '^types/organization.type';
import {EditFormSection} from '^v3/share/EditFormSection';
import {InputText} from '^v3/V3OrgSettingsPage/InputText';

export const OrgEditFormSection = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const form = useForm<UpdateOrganizationRequestDto>();
    const [membershipsCount, setMembershipsCount] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (!currentOrg) return;

        form.setValue('name', currentOrg.name);
        form.setValue('slug', currentOrg.slug);
        if (currentOrg.memberships) setMembershipsCount(currentOrg.memberships.length);
    }, [currentOrg]);

    return (
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
            <InputText
                label="회사 주소"
                placeholder="주소를 등록해주세요"
                defaultValue={currentOrg?.slug}
                editable={isEditMode}
                readOnly={true}
            />
            <InputText label="멤버" defaultValue={`${membershipsCount}명`} editable={false} />
        </EditFormSection>
    );
});
