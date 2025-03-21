import React, {memo} from 'react';
import {TeamMemberDto} from '^models/TeamMember';
import {FormControl} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControl';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {TeamMemberProfileCompact} from '^models/TeamMember/components/TeamMemberProfile';
import {FormControlEmptyValue} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControlEmptyValue';
import {ChevronDown} from 'lucide-react';

interface InvoiceAccountHoldingMemberIdProps {
    isEditMode: boolean;
    isLoading: boolean;
    defaultValue?: TeamMemberDto;
    onChange: (value: number | null) => any;
}

export const InvoiceAccountHoldingMemberId = memo((props: InvoiceAccountHoldingMemberIdProps) => {
    const {defaultValue, onChange} = props;
    const {isEditMode, isLoading} = props;

    return (
        <FormControl label="담당자">
            {isEditMode ? (
                <div
                    className={`px-2 bg-slate-100 border-slate-300 hover:bg-slate-200 hover:border-slate-400 rounded-md transition-all cursor-pointer w-full group flex items-center justify-between ${
                        isLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                >
                    <TeamMemberSelectColumn
                        defaultValue={defaultValue}
                        onChange={(member) => onChange(member?.id || null)}
                        optionListBoxTitle="담당자를 변경할까요?"
                        detachableOptionBoxTitle="현재 담당자"
                        className="flex-auto"
                        compactView
                    />
                    <ChevronDown fontSize={12} className="text-gray-400 hidden group-hover:inline-block" />
                </div>
            ) : (
                <div className={`w-full flex items-center justify-between h-[32px]`}>
                    {defaultValue ? <TeamMemberProfileCompact item={defaultValue} /> : <FormControlEmptyValue />}
                </div>
            )}
        </FormControl>
    );
});
InvoiceAccountHoldingMemberId.displayName = 'InvoiceAccountHoldingMemberId';
