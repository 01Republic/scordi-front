import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {FaCaretDown} from 'react-icons/fa6';
import {FormControl} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControl';

interface CreditCardHoldingMemberIdProps {
    isLoading: boolean;
    defaultValue?: TeamMemberDto;
    onChange: (value: number | null) => any;
}

export const CreditCardHoldingMemberId = memo((props: CreditCardHoldingMemberIdProps) => {
    const {isLoading, defaultValue, onChange} = props;

    return (
        <FormControl label="소지자">
            <div
                className={`-mx-2 px-2 bg-slate-100 border-slate-300 hover:bg-slate-200 hover:border-slate-400 rounded-md transition-all cursor-pointer w-full group flex items-center justify-between ${
                    isLoading ? 'opacity-50 pointer-events-none' : ''
                }`}
            >
                <TeamMemberSelectColumn
                    defaultValue={defaultValue}
                    onChange={(member) => onChange(member?.id || null)}
                    optionListBoxTitle="소지자를 변경할까요?"
                    detachableOptionBoxTitle="현재 소지자"
                    className="flex-auto"
                />
                <FaCaretDown fontSize={12} className="text-gray-400 hidden group-hover:inline-block" />
            </div>
        </FormControl>
    );
});
CreditCardHoldingMemberId.displayName = 'CreditCardHoldingMemberId';
