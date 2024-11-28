import {useRecoilState, useRecoilValue} from 'recoil';
import {useCallback, useEffect} from 'react';
import {membershipApi, myMembershipApi} from '^models/Membership/api';
import {currentUserAtom, currentUserMembershipAtom, getCurrentUserMembershipsQuery} from '^models/User/atom';
import {
    adminUserDetailMembershipListAtom,
    currentMembershipAtom,
    membershipInInHeaderAtom,
    membershipInInviteModalAtom,
    membershipInMembershipTable,
} from '^models/Membership/atom';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {FindAllMembershipQuery, MembershipDto} from 'src/models/Membership/types';
import {orgIdParamState} from '^atoms/common';

// 팀멤버 초대모달 / 이미 가입된 유저인지 확인
export const useMembershipInInviteModal = () => useMemberships(membershipInInviteModalAtom);

// v3 > share > LeftNavBar > Header 컴포넌트 전용 api 요청 hook
export const useMembershipInHeader = (mergeMode = false) =>
    usePagedResource(membershipInInHeaderAtom, {
        endpoint: (params) => myMembershipApi.index(params),
        useOrgId: false,
        mergeMode,
        getId: 'id',
    });

// membershipTable
export const useMembershipInMembershipTable = () => useMemberships(membershipInMembershipTable);

const useMemberships = (atoms: PagedResourceAtoms<MembershipDto, FindAllMembershipQuery>, mergeMode = false) => {
    return usePagedResource(atoms, {
        endpoint: (params) => membershipApi.index(params),
        useOrgId: true,
        buildQuery: (params, orgId) => {
            params.where = {organizationId: orgId, ...params.where};
            return params;
        },
        mergeMode,
        getId: 'id',
    });
};

// BaseLayout > AccessibleUserProvider 에서 currentUser 로부터 정의됨.
// 지금 로그인한 계정이, 현재 접속중인 워크스페이스에 가지고 있는 멤버십을 의미함.
export const useCurrentMembership = () => {
    const [currentMembership, setCurrentMembership] = useRecoilState(currentMembershipAtom);
    return {
        currentMembership,
        setCurrentMembership,
    };
};

// Admin / UserDetail / MembershipList
export const useMembershipListInAdminUserDetail = () => useMembershipsInAdmin(adminUserDetailMembershipListAtom);

const useMembershipsInAdmin = (atoms: PagedResourceAtoms<MembershipDto, FindAllMembershipQuery>, mergeMode = false) => {
    return usePagedResource(atoms, {
        endpoint: (params) => membershipApi.index(params),
        useOrgId: false,
        mergeMode,
        getId: 'id',
    });
};

// Deprecated DO NOT USE
export const useCurrentUserMemberships = () => {
    const [currentUserMemberships, refreshCurrentUserMemberships] = useRecoilState(getCurrentUserMembershipsQuery);

    return {
        currentUserMemberships,
        refreshCurrentUserMemberships,
    };
};

/**
 * 아래 useCurrentUserMembership 의 recoil selector 버전 입니다.
 * 그런데 이 훅을 사용하면 이상하게 페이지 새로고침 했을 때 로딩이 블락되는 현상이 있어 실제로 사욯하지는 않습니다.
 */
// export const useCurrentUserMembership2 = () => {
//     const [currentUserMembership, refreshCurrentUserMembership] = useRecoilState(getCurrentUserMembershipQuery);
//
//     return {
//         currentUserMembership,
//         refreshCurrentUserMembership,
//     };
// };

export interface UseCurrentUserMembershipOption {
    organizationId?: number;
    userId?: number;
    lazy?: boolean;
}

/**
 * 현재 접속한 조직에 대한 로그인된 사용자의 멤버십 정보를 가져옵니다.
 * OrgMainLayout, useCurrentUser 에서 사용되고 있습니다.
 */
const _useCurrentUserMembership = (option: UseCurrentUserMembershipOption) => {
    const {organizationId, userId, lazy = false} = option;
    const [currentUserMembership, setCurrentUserMembership] = useRecoilState(currentUserMembershipAtom);

    const getMembership = useCallback(
        (callbackFn?: (loadedCurrentUserMembership: MembershipDto | undefined) => void) => {
            // console.log('getMembership.load()', {userId, organizationId});
            if (!organizationId || isNaN(organizationId)) return;
            if (!userId || isNaN(userId)) return;

            if (
                currentUserMembership &&
                currentUserMembership.userId === userId &&
                currentUserMembership.organizationId === organizationId
            ) {
                return;
            }

            // console.log('getMembership.query()', {userId, organizationId});
            return membershipApi
                .index({where: {userId, organizationId}})
                .then((res) => res.data.items[0])
                .then((membership) => {
                    if (callbackFn) callbackFn(membership);
                    return membership;
                })
                .then(setCurrentUserMembership);
        },
        [organizationId, userId],
    );

    useEffect(() => {
        if (lazy) return;
        getMembership();
    }, [lazy, organizationId, userId]);

    return {
        currentUserMembership,
        setCurrentUserMembership,
        mutation: getMembership,
    };
};

export const useCurrentUserMembership = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const currentUser = useRecoilValue(currentUserAtom);

    const findMembershipByOrgId = (id: number) => {
        if (!currentUser || !currentUser.memberships || !currentUser.memberships.length) return;
        return currentUser.findMembershipByOrgId(id);
    };

    const currentUserMembership = (() => {
        if (!currentUser || !currentUser.memberships || !currentUser.memberships.length) return;
        if (!orgId || isNaN(orgId)) return;

        const membershipForCurrentOrg = findMembershipByOrgId(orgId);
        const membershipForLastJoinedOrg = currentUser.memberships[0];
        return membershipForCurrentOrg || membershipForLastJoinedOrg;
    })();

    return {currentUserMembership, findMembershipByOrgId};
};
