import React, {memo} from 'react';
import {TeamDto} from '^models/Team/type';
import {TeamTag} from '^models/Team/components/TeamTag';
import {FormControlEmptyValue} from './FormControlEmptyValue';
import {FormControl} from './FormControl';
import {TeamSelect} from '^models/Team/components/TeamSelect';
import {ChevronDown} from 'lucide-react';

interface CreditCardTeamProps {
    isEditMode: boolean;
    isLoading: boolean;
    defaultValue?: TeamDto[];
    onChange: (teamIds: number[]) => any;
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
                    <TeamSelect
                        className="flex-auto"
                        defaultValue={(defaultValue || [])[0]}
                        onChange={(team) => {
                            onChange(team?.id ? [team.id] : []);
                        }}
                        creatable
                    />
                    <ChevronDown fontSize={12} className="text-gray-400 hidden group-hover:inline-block" />
                </div>
            ) : (
                <div className={`w-full flex items-center h-[32px] gap-1`}>
                    {defaultValue?.length ? (
                        defaultValue.map((creditCardTeam, i) => (
                            <TeamTag key={i} id={creditCardTeam.id} name={creditCardTeam.name} />
                        ))
                    ) : (
                        <FormControlEmptyValue />
                    )}
                </div>
            )}
        </FormControl>
    );
});
CreditCardTeam.displayName = 'CreditCardTeam';
