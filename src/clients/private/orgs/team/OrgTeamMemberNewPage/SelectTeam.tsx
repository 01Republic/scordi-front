import React, {memo, useEffect, useState} from 'react';
import {useTeamsForSelectOptions} from '^models/Team/hook';
import {TeamDto} from '^models/Team/type';
import {TeamOption} from './TeamOption';
import {TeamCreateOption} from '^clients/private/orgs/team/OrgTeamMemberNewPage/TeamCreateOption';
import {CreatableSelect} from '^clients/private/_components/inputs/select/CreatableSelect';
import {TeamTag} from '^models/Team/components/TeamTag';

interface SelectTeamProps {
    defaultTeams?: TeamDto[];
    onChange?: (teams: TeamDto[]) => any;
}

export const SelectTeam = memo((props: SelectTeamProps) => {
    const {defaultTeams = [], onChange} = props;
    const {search, result, reload} = useTeamsForSelectOptions();
    const [selectedItems, setSelectedItems] = useState(defaultTeams);

    const isSelected = (team: TeamDto) => {
        return selectedItems.map((t) => t.id).includes(team.id);
    };

    const updateValues = (teams: TeamDto[]) => {
        setSelectedItems(teams);
        onChange && onChange(teams);
    };

    return (
        <CreatableSelect
            placeholder="팀을 선택해주세요"
            defaultItems={selectedItems}
            items={result.items}
            toOption={(team: TeamDto) => ({label: team.name, value: team})}
            searchItems={(inputValue) =>
                search({keyword: inputValue || undefined, order: {id: 'DESC'}}, false, true).then(
                    (res) => res?.items || [],
                )
            }
            Option={(props) => <TeamOption {...props} reload={reload} isSelected={isSelected(props.data.value)} />}
            CreateOption={(props) => <TeamCreateOption {...props} reload={reload} />}
            onSelect={(selectedOption) => {
                updateValues(selectedOption ? [selectedOption.value] : []);
            }}
            formatOptionLabel={(item, formatOptionLabelMeta) => {
                return <TeamTag id={item.id} name={item.name} />;
            }}
        />
    );
});
SelectTeam.displayName = 'SelectTeam';
