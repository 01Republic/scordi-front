import {atom} from 'recoil';

export const newTeamMemberModal = {
    isShowAtom: atom({
        key: 'v3/newTeamMemberModal/isShow',
        default: false,
    }),
    popStateSyncKey: 'v3/newTeamMemberModal/isShow',
};
