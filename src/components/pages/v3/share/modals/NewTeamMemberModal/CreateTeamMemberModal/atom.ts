import {atom} from 'recoil';
import {CreateTeamMemberDto} from '^models/TeamMember';

export const isOpenNewTeamMemberModalAtom = atom({
    key: 'isOpenNewTeamMemberModalAtom',
    default: false,
});

export const createNewTeamMemberAtom = atom<CreateTeamMemberDto>({
    key: 'createNewTeamMemberAtom',
    default: {} as CreateTeamMemberDto,
});
