import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useCurrentTeamMember} from '^models/TeamMember';
import {TeamMemberProfileCompact} from '^models/TeamMember/components/TeamMemberProfile';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {FormControl} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControl';
import {FormControlEmptyValue} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControlEmptyValue';
import {ChevronDown} from 'lucide-react';

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

    const onChangeHoldingMember = (teamMemberId: number | undefined) => {
        teamMemberId && loadCurrentTeamMember(orgId, teamMemberId);
        onChange(teamMemberId);
    };

    useEffect(() => {
        defaultValue && loadCurrentTeamMember(orgId, defaultValue);
    }, []);

    return (
        <FormControl label="관리자">
            {isEditMode ? (
                <div
                    className={`px-2 bg-slate-100 border-slate-300 hover:bg-slate-200 hover:border-slate-400 transition-all cursor-pointer w-full group flex items-center justify-between border-b-2 ${
                        isLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                >
                    <TeamMemberSelectColumn
                        defaultValue={currentTeamMember || undefined}
                        onChange={(member) => onChangeHoldingMember(member?.id)}
                        optionListBoxTitle="소지자를 변경할까요?"
                        detachableOptionBoxTitle="현재 소지자"
                        className="flex-auto"
                        compactView
                    />
                    <ChevronDown fontSize={12} className="text-gray-400 hidden group-hover:inline-block" />
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
