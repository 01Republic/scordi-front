import {atom} from 'recoil';
import {TeamMemberDto} from '^models/TeamMember/type';

export const teamMemberShowModal = {
    isShowAtom: atom({
        key: 'teamMemberShowModal/isShowAtom',
        default: false,
    }),
    popStateSyncKey: 'teamMemberShowModal',
};

export const subjectTeamMemberAtom = atom<TeamMemberDto | null>({
    key: 'subjectTeamMemberAtom',
    default: null,
});
