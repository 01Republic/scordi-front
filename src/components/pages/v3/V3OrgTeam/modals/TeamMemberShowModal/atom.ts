import {atom} from 'recoil';

export const teamMemberShowModal = {
    isShowAtom: atom({
        key: 'teamMemberShowModal/isShowAtom',
        default: false,
    }),
    popStateSyncKey: 'teamMemberShowModal',
};

export const isTeamMemberEditModeAtom = atom<boolean>({
    key: 'isTeamMemberEditModeAtom',
    default: false,
});
