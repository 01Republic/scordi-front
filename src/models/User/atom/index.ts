import {MembershipDto} from '^models/Membership/type';
import {atom, selector} from 'recoil';
import {UserDto} from '^models/User/types';
import {getToken} from '^api/api';
import {errorNotify} from '^utils/toast-notify';
import {orgIdParamState} from '^atoms/common';
import {membershipApi} from '^models/Membership/api';

export type GoogleSignedUserData = {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
};

export const currentUserAtom = atom<UserDto | null>({
    key: 'currentUser',
    default: null,
});

export const currentUserMembershipAtom = atom<MembershipDto | null>({
    key: 'currentUserMembershipAtom',
    default: null,
});

export const getCurrentUserMembershipsQueryTrigger = atom({
    key: 'getCurrentUserMembershipsQueryTrigger',
    default: 0,
});

export const getCurrentUserMembershipsQuery = selector({
    key: 'getCurrentUserMembershipsQuery',
    get: async ({get}) => {
        get(getCurrentUserMembershipsQueryTrigger);
        const currentUser = get(currentUserAtom);
        if (!currentUser) return [];
        try {
            const res = await membershipApi.index({
                where: {userId: currentUser.id},
                itemsPerPage: 100,
            });
            return res.data.items;
        } catch (e) {
            errorNotify(e);
        }
    },
    set: ({set}) => {
        set(getCurrentUserMembershipsQueryTrigger, (v) => v + 1);
    },
});

// export const getCurrentUserMembershipQueryTrigger = atom({
//     key: 'getCurrentUserMembershipQueryTrigger',
//     default: 0,
// });
//
// export const getCurrentUserMembershipQuery = selector({
//     key: 'getCurrentUserMembershipQuery',
//     get: async ({get}) => {
//         get(getCurrentUserMembershipQueryTrigger);
//         const organizationId = get(orgIdParamState);
//         const currentUser = get(currentUserAtom);
//         if (!organizationId || isNaN(organizationId)) return null;
//         if (!currentUser) return null;
//         try {
//             const res = await getMemberships({
//                 where: {userId: currentUser.id, organizationId},
//                 itemsPerPage: 100,
//             });
//             console.log(res);
//             return res.data.items[0];
//         } catch (e) {
//             errorNotify(e);
//         }
//     },
//     set: ({set}) => {
//         set(getCurrentUserMembershipQueryTrigger, (v) => v + 1);
//     },
// });

export const authenticatedUserDataAtom = atom<GoogleSignedUserData | undefined>({
    key: 'authenticatedUserDataAtom',
    default: undefined,
});

// export const getUserSessionQueryTrigger = atom({
//     key: 'getUserSessionQueryTrigger',
//     default: 0,
// });
//
// export const getUserSessionQuery = selector({
//     key: 'getUserSessionQuery',
//     get: async ({get}) => {
//         get(getUserSessionQueryTrigger);
//         const token = getToken();
//         if (!token) return;
//         try {
//             const res = await getUserSession();
//             return res.data;
//         } catch (e) {
//             errorNotify(e);
//         }
//     },
//     set: ({set}) => {
//         set(getUserSessionQueryTrigger, (v) => v + 1);
//     },
// });
