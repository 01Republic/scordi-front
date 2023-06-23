import React, {memo, useState} from 'react';
import {EditFormSection} from '^v3/share/EditFormSection';
import {InputText} from '^v3/V3OrgSettingsPage/InputText';

export const OrgManagerSection = memo(() => {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <EditFormSection
            title="관리자"
            editMode={isEditMode}
            editButton={{
                text: '수정',
                onClick: () => setIsEditMode(true),
            }}
            onCancel={() => setIsEditMode(false)}
        >
            <InputText label="서비스 관리자" defaultValue={`김규리`} editable={isEditMode} />
            <InputText label="결제 관리자" defaultValue={`-`} editable={isEditMode} />
        </EditFormSection>
    );
});
