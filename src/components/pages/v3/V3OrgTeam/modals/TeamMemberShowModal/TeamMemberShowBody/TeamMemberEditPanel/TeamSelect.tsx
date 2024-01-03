import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {SelectInput, SelectOptionNotionStyledLayout, SelectOptionProps} from '^v3/share/modals/_presenters/SelectInput';
import {TeamDto} from '^models/Team/type';
import {useTeamsV2} from '^models/Team/hook';
import {TeamTag} from '^models/Team/components/TeamTag';
import {currentTeamMemberState} from '^models/TeamMember';

interface TeamSelectProps {
    onSelect: (selectedTeam: TeamDto | undefined) => any;
}

export const TeamSelect = memo((props: TeamSelectProps) => {
    const teamMember = useRecoilValue(currentTeamMemberState);
    const {result, search} = useTeamsV2();
    const {onSelect} = props;
    const defaultValue = teamMember?.team;

    const loadTeams = () => search({order: {id: 'DESC'}}, false, true);

    return (
        <SelectInput
            required
            options={result.items.map(toOptionData)}
            defaultValue={defaultValue ? toOptionData(defaultValue) : undefined}
            onMenuOpen={() => loadTeams()}
            onSelect={(selectedOption) => {
                if (!selectedOption) return onSelect(undefined);

                const selectedTeam = result.items.find((team) => team.id === selectedOption.value);
                onSelect(selectedTeam);
            }}
            noOptionsMessage={() => <p>선택할 수 있는 팀이 없어요 :(</p>}
            components={{Option: TeamOption}}
        />
    );
});
TeamSelect.displayName = 'TeamSelect';

type TeamOptionData = {
    value: number;
    label: string;
};

const toOptionData = (team: TeamDto): TeamOptionData => {
    return {value: team.id, label: team.name};
};

const TeamOption = (props: SelectOptionProps<TeamOptionData>) => {
    const {data, isFocused, isSelected} = props;

    return (
        <SelectOptionNotionStyledLayout {...props}>
            <TeamTag id={data.value} name={data.label} />
        </SelectOptionNotionStyledLayout>
    );
};
