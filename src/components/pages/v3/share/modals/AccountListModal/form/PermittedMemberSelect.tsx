import React, {memo} from 'react';
import {MemberSelect} from '^v3/share/Select/MemberSelect';
import {UnSignedAccountFormData} from '^models/Account/types';
import {TeamMemberDto} from '^models/TeamMember';
import {UseFormReturn} from 'react-hook-form';

interface PermittedMemberSelectProps {
    formObj: UseFormReturn<UnSignedAccountFormData, any>;
    defaultValue?: TeamMemberDto[];
}

export const PermittedMemberSelect = memo((props: PermittedMemberSelectProps) => {
    const {defaultValue} = props;

    return (
        <>
            <div className="input-underline">
                <MemberSelect
                    label="사용자"
                    onChange={(e) => console.log(e)}
                    styles={selectStylesOptions}
                    defaultValue={defaultValue}
                />
            </div>
            <span />
        </>
    );
});

const selectStylesOptions = {
    dropdownIndicator: () => ({display: 'none'}),
    dropdownIndicatorsContainer: () => ({display: 'none'}),
    indicatorsContainer: () => ({display: 'none'}),
    control: () => ({border: 'none'}),
    container: () => ({height: '2.5rem', placeholder: 'none'}),
};
