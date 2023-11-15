import {atom, selector} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {errorNotify} from '^utils/toast-notify';
import {OrganizationDto} from '^models/Organization/type';
import {currentUserAtom} from '^models/User/atom';
import {Paginated} from '^types/utils/paginated.dto';
import {MembershipDto} from '^models/Membership/type';

// export const currentMembershipAtom = atom<OrganizationDto | null>({
//     key: 'currentMembershipAtom',
//     default: null,
// });

/**
 * [Show]
 */
// export const getMembershipQueryTrigger = atom({
//     key: 'getMembershipQueryTrigger',
//     default: 0,
// });
//
// export const getMembershipQuery = selector({
//     key: 'getMembershipQuery',
//     get: async ({get}) => {
//         get(getMembershipQueryTrigger);
//         const organizationId = get(orgIdParamState);
//         const currentUser = get(currentUserAtom);
//         if (isNaN(organizationId)) return;
//         if (currentUser)
//         try {
//             const res = await getMemberships();
//             return res.data;
//         } catch (e) {
//             errorNotify(e);
//         }
//     },
//     set: ({set}) => {
//         set(getMembershipQueryTrigger, (v) => v + 1);
//     },
// });

export const orgMembershipSearchResultAtom = atom<Paginated<MembershipDto>>({
    key: 'org/Membership/SearchResult/Atom',
    default: {
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 1,
            currentPage: 1,
            itemsPerPage: 30,
        },
    },
});
