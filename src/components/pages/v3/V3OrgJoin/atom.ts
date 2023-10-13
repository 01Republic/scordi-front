import {atom} from 'recoil';

export const invitedOrgIdAtom = atom<number>({
    key: 'invitedOrgId',
    default: 0,
});
