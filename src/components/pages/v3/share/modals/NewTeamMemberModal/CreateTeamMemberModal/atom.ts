import {atom} from 'recoil';
import {CreateTeamMemberDto, TeamMemberDto} from '^models/TeamMember';

export const isOpenNewTeamMemberModalAtom = atom({
    key: 'isOpenNewTeamMemberModalAtom',
    default: false,
});

export const createNewTeamMemberAtom = atom<CreateTeamMemberDto>({
    key: 'createNewTeamMemberAtom',
    default: {} as CreateTeamMemberDto,
});

export const lastTeamMemberInfo = atom<TeamMemberDto>({
    key: 'lastTeamMemberInfo',
    default: {} as TeamMemberDto,
});
