import {TeamDto} from '^models/Team/type';
import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {TeamTag} from '^models/Team/components/TeamTag';
import {teamApi} from '^models/Team/api';
import {useTeamsForSelectOptions} from '^models/Team/hook';
import {orgIdParamState} from '^atoms/common';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface TeamSelectProps {
    defaultValue?: TeamDto;
    onChange?: (team?: TeamDto) => any;
    className?: string;
    creatable?: boolean;
    removable?: boolean;
}

export const TeamSelect = memo((props: TeamSelectProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {search, reload} = useTeamsForSelectOptions();
    const {onChange, className = ''} = props;
    const {creatable = false, removable = false} = props;
    const [selectedTeam, setSelectedTeam] = useState(props.defaultValue);

    const getOptions = async (keyword?: string) => {
        return search({keyword, order: {id: 'DESC'}}, false, true).then((res) => {
            return res?.items || [];
        });
    };

    const selectOption = async (team?: TeamDto) => {
        setSelectedTeam(team);
        if (team?.id === selectedTeam?.id) return;
        return onChange && onChange(team);
    };

    const createOption = async (keyword: string) => {
        if (!keyword) return;
        return teamApi.create(orgId, {name: keyword}).then((res) => selectOption(res.data));
    };

    const deleteOption = async (option: TeamDto) => {
        try {
            await teamApi.destroy(orgId, option.id).then(() => reload());
            toast.success('삭제되었습니다');
            return true;
        } catch (err) {
            return false;
        }
    };

    return (
        <SelectColumn
            value={selectedTeam}
            getOptions={getOptions}
            ValueComponent={TeamTagOption}
            EmptyComponent={() => <TagUI className="text-gray-300 !px-0">비어있음</TagUI>}
            valueOfOption={(team) => team.id}
            textOfOption={(team) => team.name}
            keywordFilter={(team, keyword) => team.name.includes(keyword)}
            onSelect={selectOption}
            // contentMinWidth="240px"
            contentMinWidth="100%"
            inputDisplay
            optionListBoxTitle={selectedTeam ? '팀을 변경합니다' : `팀 선택${creatable ? ' 또는 추가' : ''}`}
            onCreate={creatable ? (keyword) => createOption(keyword) : undefined}
            optionDestroy={
                !removable
                    ? undefined
                    : (option) => {
                          if (!option) return false;
                          return deleteOption(option);
                      }
            }
            optionWrapperClass={className}
        />
    );
});
TeamSelect.displayName = 'TeamSelect';

const TeamTagOption = memo((props: {value: TeamDto | string}) => {
    const {value} = props;

    if (typeof value === 'string') {
        return <p>{value}</p>;
    }

    return <TeamTag id={value.id} name={value.name} />;
});
