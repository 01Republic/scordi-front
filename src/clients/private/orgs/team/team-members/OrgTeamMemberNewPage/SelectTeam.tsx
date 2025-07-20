import React, {memo, useState} from 'react';
import {useTeamsForSelectOptions} from '^models/Team/hook';
import {TeamDto} from '^models/Team/type';
import {TeamTag} from '^models/Team/components/TeamTag';
import {CreatableSelect} from '^clients/private/_components/inputs/select/CreatableSelect';
import {TeamOption} from './TeamOption';
import {TeamCreateOption} from './TeamCreateOption';
import {useTranslation} from 'next-i18next';

interface SelectTeamProps {
    defaultTeams?: TeamDto[];
    onChange?: (teams: TeamDto[]) => any;
}

export const SelectTeam = memo((props: SelectTeamProps) => {
    const {t} = useTranslation('members');
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
            placeholder={t('selectTeam.placeholder') as string}
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

interface SelectTeamIdProps {
    defaultTeamIds?: number[];
    onChange?: (teams: TeamDto[]) => any;
}

export const SelectTeamId = memo((props: SelectTeamIdProps) => {
    const {t} = useTranslation('members');
    const {defaultTeamIds = [], onChange} = props;
    const {search, result, reload} = useTeamsForSelectOptions();
    const [selectedIds, setSelectedIds] = useState(defaultTeamIds);
    const selectedItems = result.items.filter((team) => selectedIds.includes(team.id));

    const isSelected = (team: TeamDto) => {
        return selectedIds.includes(team.id);
    };

    const updateValues = (teams: TeamDto[]) => {
        setSelectedIds(teams.map((t) => t.id));
        onChange && onChange(teams);
    };

    return (
        <CreatableSelect
            placeholder={t('selectTeam.placeholder') as string}
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
SelectTeamId.displayName = 'SelectTeamId';
