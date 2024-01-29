import React, {memo, useState} from 'react';
import Select, {SingleValue} from 'react-select';
import {Components, selectStylesOptions} from './SelectOptions';

import {MemberSelect} from '^v3/share/Select/MemberSelect';

type TeamMemberOption = {
    label: string;
    value: number; // teamMember.id
    email?: string | null;
    profileImgUrl?: string | null;
};

interface SelectMasterProfileProps {
    onChange: (selectedOption: TeamMemberOption | null) => any;
}

export const SelectMasterProfile = memo((props: SelectMasterProfileProps) => {
    const [selectedMember, setSelectedMember] = useState<TeamMemberOption | null>(null);
    const {onChange} = props;

    return (
        <MemberSelect
            onChange={(option) => {
                const selected = option as SingleValue<TeamMemberOption>;
                setSelectedMember(selected);
                onChange(selected);
            }}
            defaultValue={selectedMember}
            placeholder="담당자를 선택해주세요"
            styles={selectStylesOptions}
            components={Components()}
        />
    );
});
