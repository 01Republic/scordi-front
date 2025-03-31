import {TeamDto} from '^models/Team/type';
import React, {memo, useState} from 'react';
import {useTeamsForSelectOptions} from '^models/Team/hook';
import {CreatableSelect} from '^clients/private/_components/inputs/select/CreatableSelect';
import {TeamOption} from '^clients/private/orgs/team/team-members/OrgTeamMemberNewPage/TeamOption';
import {TeamCreateOption} from '^clients/private/orgs/team/team-members/OrgTeamMemberNewPage/TeamCreateOption';
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
            className={
                'flex h-12 w-full !rounded-md !border border-input !bg-white px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
            }
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
