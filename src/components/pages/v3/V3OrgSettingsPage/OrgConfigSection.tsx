import React, {memo} from 'react';
import {EditFormSection} from '^v3/share/EditFormSection';
import {FormControl} from '^v3/V3OrgSettingsPage/InputText';
import {LanguageInput} from '^v3/V3OrgSettingsPage/LanguageInput';

export const OrgConfigSection = memo(() => {
    return (
        <EditFormSection title="워크스페이스 설정" editMode={false}>
            <LanguageInput />
        </EditFormSection>
    );
});
