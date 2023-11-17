import {atom} from 'recoil';
import {TeamMemberDto} from '^models/TeamMember/type';

export const teamMemberModal = {
    isShowAtom: atom({
        key: 'teamMemberModal/isShowAtom',
        default: false,
    }),
};

export const subjectMemberAtom = atom<TeamMemberDto | null>({
    key: 'subjectMemberAtom',
    default: null,
});
