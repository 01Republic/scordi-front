import {atom} from 'recoil';
import {TeamMemberDto} from '^models/TeamMember';

export const teamMemberSelectModalAtom = {
    isShowAtom: atom({
        key: 'TeamMemberSelectModalAtom/isShowAtom',
        default: false,
    }),
};

export const teamMemberListAtom = atom<TeamMemberDto[]>({
    key: 'TeamMemberSelectModalAtom/teamMemberList',
    default: [],
});
