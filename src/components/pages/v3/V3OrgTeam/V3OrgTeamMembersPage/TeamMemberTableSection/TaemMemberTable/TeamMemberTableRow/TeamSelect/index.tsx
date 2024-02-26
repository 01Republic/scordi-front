import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useToast} from '^hooks/useToast';
import {teamApi} from '^models/Team/api';
import {TeamDto} from '^models/Team/type';
import {useTeamsV2} from '^models/Team/hook';
import {teamMemberApi, TeamMemberDto, useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {TeamTag} from '^models/Team/components/TeamTag';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface TeamSelectProps {
    teamMember: TeamMemberDto;
    onChange: (team: TeamDto) => any;
}

export const TeamSelect = memo((props: TeamSelectProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {reload: loadTeamMembers} = useTeamMembersInTeamMembersTable();
    const {search} = useTeamsV2();
    const {toast} = useToast();
    const {teamMember, onChange} = props;

    const getOptions = async (keyword?: string) => {
        return search({keyword, order: {id: 'DESC'}}, false, true).then((res) => {
            return res?.items || [];
        });
    };

    const onSelect = async (team: TeamDto) => {
        if (team.id === teamMember.team?.id) return;

        return teamMemberApi
            .update(orgId, teamMember.id, {teamIds: [team.id]})
            .then(() => onChange(team))
            .finally(() => toast.success('저장했습니다'));
    };

    const onCreate = async (keyword: string) => {
        if (!keyword) return;
        return teamApi.create(orgId, {name: keyword}).then((res) => onSelect(res.data));
    };

    const onDelete = async (option: TeamDto) => {
        try {
            await teamApi.destroy(orgId, option.id);
            loadTeamMembers();
            toast.success('삭제되었습니다');
            return true;
        } catch (err) {
            return false;
        }
    };

    return (
        <SelectColumn
            value={teamMember.team}
            getOptions={getOptions}
            ValueComponent={TeamTagOption}
            EmptyComponent={() => <TagUI className="text-gray-300 !px-0">비어있음</TagUI>}
            valueOfOption={(team) => team.id}
            textOfOption={(team) => team.name}
            keywordFilter={(team, keyword) => team.name.includes(keyword)}
            onSelect={onSelect}
            contentMinWidth="240px"
            inputDisplay
            optionListBoxTitle={teamMember.team ? '팀을 변경합니다' : '팀을 추가합니다'}
            onCreate={(keyword) => onCreate(keyword)}
            optionDestroy={(option) => onDelete(option)}
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
