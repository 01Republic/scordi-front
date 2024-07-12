import React, {memo} from 'react';
import {TeamDto} from '^models/Team/type';
import {TeamSelect} from '^models/Team/components/TeamSelect';
import {FaCaretDown} from 'react-icons/fa6';
import {FormControl} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/CardInformationPanel/FormControl';
import {TeamTag} from '^models/Team/components/TeamTag';

interface CreditCardTeamProps {
    isEditMode: boolean;
    isLoading: boolean;
    defaultValue?: TeamDto;
    onChange: (team?: TeamDto | undefined) => any;
}

export const CreditCardTeam = memo((props: CreditCardTeamProps) => {
    const {isEditMode, isLoading, defaultValue, onChange} = props;

    return (
        <FormControl label="팀">
            {isEditMode ? (
                <div
                    className={`-mx-2 px-2 bg-slate-100 border-slate-300 hover:bg-slate-200 hover:border-slate-400 rounded-md transition-all cursor-pointer w-full group flex items-center justify-between ${
                        isLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                >
                    <TeamSelect defaultValue={defaultValue} onChange={onChange} />
                    <FaCaretDown fontSize={12} className="text-gray-400 hidden group-hover:inline-block" />
                </div>
            ) : (
                <div className={`w-full flex items-center justify-between h-[32px]`}>
                    {defaultValue ? (
                        <TeamTag id={defaultValue.id} name={defaultValue.name} />
                    ) : (
                        <div className="text-12 text-gray-300">비어 있음</div>
                    )}
                </div>
            )}
        </FormControl>
    );
});
CreditCardTeam.displayName = 'CreditCardTeam';
