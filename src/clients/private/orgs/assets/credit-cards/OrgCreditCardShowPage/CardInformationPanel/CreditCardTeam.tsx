import React, {memo} from 'react';
import {TeamDto} from '^models/Team/type';
import {TeamTag} from '^models/Team/components/TeamTag';
import {FormControlEmptyValue} from './FormControlEmptyValue';

interface CreditCardTeamProps {
    defaultValue?: TeamDto[];
}

export const CreditCardTeam = memo((props: CreditCardTeamProps) => {
    const {defaultValue} = props;

    return (
        <label className="grid grid-cols-4 gap-4">
            <div className="flex items-center justify-start text-14 text-gray-400">팀</div>

            <div className="col-span-3">
                <div className={`w-full flex items-center h-[32px] gap-1`}>
                    {defaultValue?.length ? (
                        defaultValue.map((creditCardTeam, i) => (
                            <TeamTag key={i} id={creditCardTeam.id} name={creditCardTeam.name} />
                        ))
                    ) : (
                        <FormControlEmptyValue />
                    )}
                </div>
            </div>
        </label>
    );
});
CreditCardTeam.displayName = 'CreditCardTeam';
