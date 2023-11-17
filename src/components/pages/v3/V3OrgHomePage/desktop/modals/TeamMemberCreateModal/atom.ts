import {atom} from 'recoil';

export const teamMemberCreateModal = {
    isShowAtom: atom({
        key: 'teamMemberCreateModal',
        default: false,
    }),
};
