import {useRecoilState} from 'recoil';
import {currentUserMembershipAtom, getCurrentUserMembershipsQuery} from '^atoms/currentUser.atom';
import {useCallback, useEffect} from 'react';
import {getMemberships} from '^api/membership.api';
import {MembershipDto} from '^types/membership.type';

export const useCurrentUserMemberships = () => {
    const [currentUserMemberships, refreshCurrentUserMemberships] = useRecoilState(getCurrentUserMembershipsQuery);

    return {
        currentUserMemberships,
        refreshCurrentUserMemberships,
    };
};

export interface UseCurrentUserMembershipOption {
    organizationId?: number;
    userId?: number;
    lazy?: boolean;
}

// 아직 사용하지 않음. 제작 중.
// OrgMainLayout, useCurrentUser 두 곳에서 같은 기능을 구현하고 있음.
export const useCurrentUserMembership = (option: UseCurrentUserMembershipOption) => {
    const {organizationId, userId, lazy = false} = option;
    const [currentUserMembership, setCurrentUserMembership] = useRecoilState(currentUserMembershipAtom);

    const getMembership = useCallback(
        (callbackFn?: (loadedCurrentUserMembership: MembershipDto | undefined) => void) => {
            console.log('getMembership.load()', {userId, organizationId});
            if (!organizationId || isNaN(organizationId)) return;
            if (!userId || isNaN(userId)) return;

            if (
                currentUserMembership &&
                currentUserMembership.userId === userId &&
                currentUserMembership.organizationId === organizationId
            ) {
                return;
            }

            console.log('getMembership.query()', {userId, organizationId});
            return getMemberships({where: {userId, organizationId}})
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
