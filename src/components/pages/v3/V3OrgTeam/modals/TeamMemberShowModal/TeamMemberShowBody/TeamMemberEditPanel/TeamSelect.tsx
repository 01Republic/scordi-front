import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {SelectInput, SelectOptionNotionStyledLayout, SelectOptionProps} from '^v3/share/modals/_presenters/SelectInput';
import {TeamDto} from '^models/Team/type';
import {useTeamsV2} from '^models/Team/hook';
import {TeamTag} from '^models/Team/components/TeamTag';
import {currentTeamMemberState} from '^models/TeamMember';
import {lastTeamMemberInfo} from '^v3/share/modals/NewTeamMemberModal/CreateTeamMemberModal';
import {components, MenuListProps} from 'react-select';
import {teamApi} from '^models/Team/api';
import {orgIdParamState} from '^atoms/common';

interface TeamSelectProps {
    onSelect: (selectedTeam: TeamDto | undefined) => any;
}

export const TeamSelect = memo((props: TeamSelectProps) => {
    const teamMember = useRecoilValue(currentTeamMemberState);
    const {result, search} = useTeamsV2();
    const lastTeamMember = useRecoilValue(lastTeamMemberInfo);
    const orgId = useRecoilValue(orgIdParamState);

    const {onSelect} = props;
    const defaultValue = teamMember?.team ?? lastTeamMember.team;
    const loadTeams = () => search({order: {id: 'DESC'}}, false, true);

    return (
        <SelectInput
            required
            options={result.items.map(toOptionData)}
            defaultValue={defaultValue ? toOptionData(defaultValue) : undefined}
            onMenuOpen={() => loadTeams()}
            onSelect={(selectedOption) => {
                if (!selectedOption) return onSelect(undefined);

                if (typeof selectedOption.value === 'string')
                    return teamApi.create(orgId, {name: selectedOption.value}).then((res) => onSelect(res.data));

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
