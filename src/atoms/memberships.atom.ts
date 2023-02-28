import {atom, selector} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {getOrganization} from '^api/organization.api';
import {errorNotify} from '^utils/toast-notify';
import {OrganizationDto} from '^types/organization.type';
import {getMemberships} from '^api/membership.api';
import {currentUserAtom} from '^atoms/currentUser.atom';

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
