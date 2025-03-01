import React, {memo, useState} from 'react';
import {FaCaretDown} from 'react-icons/fa6';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {TeamMemberDto, useTeamMembers} from '^models/TeamMember';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {BankAccountAttrSelectPropsType} from './BankAccountAttrSelectProps.type';

export const BankAccountHoldingMemberIdSelect = memo((props: BankAccountAttrSelectPropsType<number>) => {
    const {defaultValue, isLoading = false, onChange} = props;
    const {result} = useTeamMembers();
    const [holdingMember, setHoldingMember] = useState<TeamMemberDto | undefined>(() => {
        return defaultValue ? result.items.find((member) => member.id === defaultValue) : undefined;
    });

    return (
        <FormControl label="관리자">
            <div
                className={`input input-underline !bg-slate-100 w-full flex items-center justify-between ${
                    isLoading ? 'opacity-50 pointer-events-none' : ''
                }`}
            >
                <input type="hidden" name="holdingMemberId" value={holdingMember?.id || defaultValue} />
                <TeamMemberSelectColumn
                    onChange={(member) => {
                        setHoldingMember(member);
                        !!onChange && onChange(member?.id);
                    }}
                    optionListBoxTitle="관리자를 변경할까요?"
                    detachableOptionBoxTitle="현재 관리자"
                    className="flex-auto"
                    defaultValue={holdingMember}
                />
                <FaCaretDown fontSize={12} className="text-gray-500" />
            </div>
            <span></span>
        </FormControl>
    );
});
BankAccountHoldingMemberIdSelect.displayName = 'CardHoldingMemberIdSelect';
