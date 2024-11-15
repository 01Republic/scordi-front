import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {teamApi} from '../api';
import {FindAllTeamQueryDto, TeamDto, UpdateTeamDto} from '../type';
import {
    currentTeamAtom,
    isCurrentTeamLoadingAtom,
    teamListForSelectOptionsAtom,
    teamsListAtom,
    teamsListForTeamListPageAtom,
} from '../atom';
import {useIsLoading} from '^hooks/useResource/useIsLoading';

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
    const orgId = useRecoilValue(orgIdParamState);
    const teamId = useRecoilValue(teamIdParamState);
    const [team, setTeam] = useRecoilState(currentTeamAtom);
    const {isLoading, loadingScope} = useIsLoading(isCurrentTeamLoadingAtom);

    const fetchData = (force = false) => {
        if (!force && team && team.id === teamId) return;

        return loadingScope(() => {
            return teamApi.show(orgId, teamId).then((res) => {
                setTeam(res.data);
            });
        });
    };

    const reload = () => fetchData(true);
    const reloadWithUpdateCounters = () => update({}, {silent: true});

    const update = (
        data: UpdateTeamDto,
        option?: {
            silent?: boolean;
        },
    ) => {
        return loadingScope(() => {
            return teamApi.update(orgId, teamId, data).then(() => {
                if (!option?.silent) toast.success('변경사항이 저장되었습니다.');
                reload();
            });
        });
    };

    useEffect(() => {
        !!teamId && fetchData();
    }, [teamId]);

    return {
        team,
        reload,
        update,
        isLoading,
        reloadWithUpdateCounters,
    };
};
