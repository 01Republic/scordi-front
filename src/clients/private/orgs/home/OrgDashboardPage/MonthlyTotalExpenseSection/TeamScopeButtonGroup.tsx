import {memo} from 'react';
import {TeamDto} from '^models/Team/type';
import {TeamScopeButton} from './TeamScopeButton';

interface TeamScopeButtonGroupProps {
    teams: TeamDto[];
    selectedTeam?: TeamDto;
    onSelect: (team?: TeamDto) => any;
}

export const TeamScopeButtonGroup = memo((props: TeamScopeButtonGroupProps) => {
    const {teams, selectedTeam, onSelect} = props;

    return (
        <div className="flex items-center gap-2 overflow-auto no-scrollbar">
            <TeamScopeButton text="전체" onClick={() => onSelect(undefined)} active={selectedTeam === undefined} />
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
