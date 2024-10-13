import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {teamApi} from '^models/Team/api';
import {
    teamListForSelectOptionsAtom,
    teamMemberSubscriptionListAtom,
    teamsListAtom,
    teamsListForTeamListPageAtom,
} from '^models/Team/atom';
import {FindAllTeamQueryDto, TeamDto, UpdateTeamDto} from '^models/Team/type';
import React, {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, teamIdParamState, useRouterIdParamState} from '^atoms/common';
import {FindAllTeamMemberSubscriptionQueryDto, TeamMemberSubscriptionDto} from '^models/TeamMember';
import {toast} from 'react-hot-toast';

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

// 팀 구독 목록
export const useTeamsSubscriptionForDetailPage = () => useTeamsSubscription(teamMemberSubscriptionListAtom);

const useTeamsSubscription = (
    atoms: PagedResourceAtoms<TeamMemberSubscriptionDto, FindAllTeamMemberSubscriptionQueryDto>,
) => {
    const teamId = useRecoilValue(teamIdParamState);
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => teamApi.subscriptions.index(orgId, teamId, params),
        getId: 'subscriptionId',
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
