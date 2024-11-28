import {atom} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllMembershipQuery, MembershipDto} from 'src/models/Membership/types';
import {pagedResourceAtom} from '^hooks/usePagedResource';

export const signSavedMembershipIdAtom = atom<number | undefined>({
    key: 'signSavedMembershipIdAtom',
    default: undefined,
});
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

// 팀멤버 초대모달 / 이미 가입된 유저인지 확인
export const membershipInInviteModalAtom = pagedResourceAtom<MembershipDto, FindAllMembershipQuery>({
    key: 'pagedSubscriptions_MembershipInInviteModal/Atom',
});

// v3 > share > LeftNavBar > Header 컴포넌트 전용 api 요청 hook
// 다른곳에서 사용하지 않기
export const membershipInInHeaderAtom = pagedResourceAtom<MembershipDto, FindAllMembershipQuery>({
    key: 'pagedSubscriptions_MembershipInInHeader/Atom',
});

// membershipTable
export const membershipInMembershipTable = pagedResourceAtom<MembershipDto, FindAllMembershipQuery>({
    key: 'pagedSubscriptions_membershipInMembershipTable/Atom',
});

// BaseLayout > AccessibleUserProvider 에서 currentUser 로부터 정의됨.
// 지금 로그인한 계정이, 현재 접속중인 워크스페이스에 가지고 있는 멤버십을 의미함.
export const currentMembershipAtom = atom<MembershipDto | null>({
    key: 'currentMembershipAtom',
    default: null,
});
