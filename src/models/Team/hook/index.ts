import {useRecoilState, useRecoilValue} from 'recoil';
import {toast} from 'react-hot-toast';
import {orgIdParamState} from '^atoms/common';
import {PagedResourceAtoms, usePagedResource, usePaginateUtils} from '^hooks/usePagedResource';
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
import {FindAllTeamMemberQueryDto, teamMemberApi} from '^models/TeamMember';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {TEAM_MEMBER_HOOK_KEY} from '^models/TeamMember/hook/key';
import {Paginated} from '^types/utils/paginated.dto';
import {TEAM_HOOK_KEY} from '^models/Team/hook/key';

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
    const [team, setTeam] = useRecoilState(currentTeamAtom);
    const {isLoading, loadingScope} = useIsLoading(isCurrentTeamLoadingAtom);

    const fetchData = (teamId: number, force = false) => {
        if (!force && team && team.id === teamId) return;

        return loadingScope(() => {
            return teamApi.show(orgId, teamId).then((res) => {
                const newTeam = res.data;
                setTeam((oldTeam) => {
                    if (oldTeam && JSON.stringify(oldTeam) === JSON.stringify(newTeam)) return oldTeam;
                    return newTeam;
                });
            });
        });
    };

    const reload = () => team && fetchData(team.id, true);
    const reloadWithUpdateCounters = () => update({}, {silent: true});

    const update = (
        data: UpdateTeamDto,
        option?: {
            silent?: boolean;
        },
    ) => {
        if (!team) return;
        return loadingScope(() => {
            return teamApi.update(orgId, team.id, data).then(() => {
                if (!option?.silent) toast.success('변경사항이 저장되었습니다.');
                reload();
            });
        });
    };

    const clear = () => setTeam(undefined);

    return {
        team,
        fetchData,
        reload,
        update,
        clear,
        isLoading,
        reloadWithUpdateCounters,
    };
};

// 팀 상세p - 요약패널
export const useCurrentTeam2 = (orgId: number, id?: number) => {
    return useQuery({
        queryKey: [TEAM_HOOK_KEY.detail, orgId, id],
        queryFn: () => teamApi.show(orgId, id!).then((res) => res.data),
        enabled: !!orgId && !isNaN(orgId) && !!id,
    });
};
