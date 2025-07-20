import React, {memo, useState} from 'react';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {SelectTeamId} from './SelectTeam';
import {useTranslation} from 'next-i18next';

interface TeamMemberTeamSelectProps {
    defaultValue?: number[];
}

export const TeamMemberTeamSelect = memo((props: TeamMemberTeamSelectProps) => {
    const {t} = useTranslation('members');
    const {defaultValue = []} = props;
    const [teamIds, setTeamIds] = useState(defaultValue);

    return (
        <FormControl label={t('new.form.team') as string}>
            <input name="teamIds" type="hidden" value={JSON.stringify(teamIds)} />
            <SelectTeamId
                defaultTeamIds={teamIds}
                onChange={(teams) => {
                    setTeamIds(teams.map((t) => t.id));
                }}
            />
        </FormControl>
    );
});
TeamMemberTeamSelect.displayName = 'TeamMemberName';
