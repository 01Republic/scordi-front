import React, {useEffect} from 'react';
import {toast} from 'react-hot-toast';
import {orgIdParamState, teamIdParamState, useRouterIdParamState} from '^atoms/common';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {teamApi} from '../api';
import {FindAllTeamQueryDto, TeamDto, UpdateTeamDto} from '../type';
import {teamListForSelectOptionsAtom, teamsListAtom, teamsListForTeamListPageAtom} from '../atom';

export const useTeamsV2 = () => useTeams(teamsListAtom);

// 팀 목록 페이지 > 팀 목록 테이블
export const useTeamsForListPage = () => useTeams(teamsListForTeamListPageAtom);

// 팀 Select Input (mono-select) 에서 사용
export const useTeamsForSelectOptions = () => useTeams(teamListForSelectOptionsAtom);

const useTeams = (atoms: PagedResourceAtoms<TeamDto, FindAllTeamQueryDto>, mergeMode = false) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => teamApi.index(orgId, params),
        getId: 'id',
    });
};

export const useCurrentTeam = () => {
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const teamId = useRouterIdParamState('teamId', teamIdParamState);
    const [team, setTeam] = React.useState<TeamDto | undefined>(undefined);

    const getTeamInfo = () => {
        setTeam(undefined);
        teamApi.show(orgId, teamId).then((res) => {
            setTeam(res.data);
        });
    };

    const reload = () => {
        getTeamInfo();
    };

    const update = (
        data: UpdateTeamDto,
        option?: {
            silent?: boolean;
        },
    ) => {
        return teamApi.update(orgId, teamId, data).then(() => {
            if (!option?.silent) toast.success('변경사항이 저장되었습니다.');
            reload();
        });
    };

    useEffect(() => {
        !!teamId && getTeamInfo();
    }, [teamId]);

    return {
        team,
        reload,
        update,
    };
};
