import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {FaCaretDown} from 'react-icons/fa6';
import {orgIdParamState} from '^atoms/common';
import {useCurrentTeamMember} from '^models/TeamMember';
import {TeamMemberProfileCompact} from '^models/TeamMember/components/TeamMemberProfile';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {FormControl} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControl';
import {FormControlEmptyValue} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControlEmptyValue';

interface BankAccountHoldingMemberProps {
    isEditMode: boolean;
    isLoading: boolean;
    defaultValue?: number;
    onChange: (value: number | undefined) => any;
}

export const BankAccountHoldingMember = memo((props: BankAccountHoldingMemberProps) => {
    const {defaultValue, onChange} = props;
    const {isEditMode, isLoading} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {loadCurrentTeamMember, currentTeamMember} = useCurrentTeamMember();

    useEffect(() => {
        defaultValue && loadCurrentTeamMember(orgId, defaultValue);
    }, []);

    return (
        <FormControl label="소지자">
            {isEditMode ? (
                <div
                    className={`-mx-2 px-2 bg-slate-100 border-slate-300 hover:bg-slate-200 hover:border-slate-400 rounded-md transition-all cursor-pointer w-full group flex items-center justify-between ${
                        isLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                >
                    <TeamMemberSelectColumn
                        defaultValue={currentTeamMember || undefined}
                        onChange={(member) => onChange(member?.id || undefined)}
                        optionListBoxTitle="소지자를 변경할까요?"
                        detachableOptionBoxTitle="현재 소지자"
                        className="flex-auto"
                        compactView
                    />
                    <FaCaretDown fontSize={12} className="text-gray-400 hidden group-hover:inline-block" />
                </div>
            ) : (
                <div className={`w-full flex items-center justify-between h-[32px]`}>
                    {currentTeamMember ? (
                        <TeamMemberProfileCompact item={currentTeamMember} />
                    ) : (
                        <FormControlEmptyValue />
                    )}
                </div>
            )}
        </FormControl>
    );
});
