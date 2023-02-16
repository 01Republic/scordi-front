import {atom, selector} from 'recoil';
import {UserDto} from '^types/user.type';
import {getUserSession} from '^api/session.api';
import {getToken} from '^api/api';
import {errorNotify} from '^utils/toast-notify';

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
