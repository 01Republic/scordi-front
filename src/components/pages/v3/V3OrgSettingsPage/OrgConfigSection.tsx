import React, {memo} from 'react';
import {EditFormSection} from '^v3/share/EditFormSection';
import {LanguageInput} from '^v3/V3OrgSettingsPage/LanguageInput';
import {CurrencyInput} from '^v3/V3OrgSettingsPage/CurrencyInput';

export const OrgConfigSection = memo(() => {
    return (
        <EditFormSection title="워크스페이스 설정" editMode={false}>
            <LanguageInput />
            <CurrencyInput />
        </EditFormSection>
    );
});
