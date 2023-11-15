import {useRecoilState} from 'recoil';
import {currentUserMembershipAtom, getCurrentUserMembershipsQuery} from '^models/User/atom';
import {useCallback, useEffect, useState} from 'react';
import {FindAllMembershipQuery, MembershipDto} from '^types/membership.type';
import {orgMembershipSearchResultAtom} from '^atoms/memberships.atom';
import {membershipApi} from '^api/membership.api';

export const useMemberships = () => {
    const [membershipSearchResult, setMembershipSearchResult] = useRecoilState(orgMembershipSearchResultAtom);
    const [query, setQuery] = useState<FindAllMembershipQuery>({});

    async function searchMemberships(params: FindAllMembershipQuery) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        const data = await membershipApi.index(params).then((res) => res.data);
        setMembershipSearchResult(data);
        setQuery(params);
    }

    return {
        query,
        membershipSearchResult,
        searchMemberships,
    };
};

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
export const useCurrentUserMembership = (option: UseCurrentUserMembershipOption) => {
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
