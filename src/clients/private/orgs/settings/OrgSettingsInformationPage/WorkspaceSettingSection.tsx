import React, {memo} from 'react';
import {SelectDropdown} from '^v3/share/Select';
import {OrgSettingsListSection} from '^clients/private/_layouts/OrgSettingsLayout';

interface WorkspaceSettingSectionProps {
    orgId: number;
}

export const WorkspaceSettingSection = memo((props: WorkspaceSettingSectionProps) => {
    const {orgId} = props;

    return (
        <OrgSettingsListSection
            title="워크스페이스 설정"
            items={[
                {
                    title: <span className="text-15">언어 설정</span>,
                    desc: (
                        <SelectDropdown
                            placeholder="언어를 선택해주세요."
                            options={[{value: 'kr', text: '한국어', selected: true}]}
                            onChange={() => null}
                        />
                    ),
                },
            ]}
        />
    );
});
WorkspaceSettingSection.displayName = 'WorkspaceSettingSection';
