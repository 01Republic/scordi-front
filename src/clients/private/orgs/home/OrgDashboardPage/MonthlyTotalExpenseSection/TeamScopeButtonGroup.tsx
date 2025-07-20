import {memo} from 'react';
import {TeamDto} from '^models/Team/type';
import {TeamScopeButton} from './TeamScopeButton';
import {useTranslation} from 'next-i18next';

interface TeamScopeButtonGroupProps {
    teams: TeamDto[];
    selectedTeam?: TeamDto;
    onSelect: (team?: TeamDto) => any;
}

export const TeamScopeButtonGroup = memo((props: TeamScopeButtonGroupProps) => {
    const {teams, selectedTeam, onSelect} = props;
    const {t} = useTranslation('dashboard');

    return (
        <div className="flex items-center gap-2 overflow-auto no-scrollbar">
            <TeamScopeButton
                text={t('teamScope.all') || '전체'}
                onClick={() => onSelect(undefined)}
                active={selectedTeam === undefined}
            />
            {teams.map((team) => (
                <TeamScopeButton
                    key={team.id}
                    text={team.name}
                    onClick={() => onSelect(team)}
                    active={selectedTeam?.id === team.id}
                />
            ))}
        </div>
    );
});
TeamScopeButtonGroup.displayName = 'TeamScopeButtonGroup';
