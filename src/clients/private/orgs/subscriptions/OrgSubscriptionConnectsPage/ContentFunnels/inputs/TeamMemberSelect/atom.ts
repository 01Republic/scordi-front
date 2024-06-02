import {atom} from 'recoil';
import {TeamMemberDto} from '^models/TeamMember';

export const selectedTeamMembersAtom = atom<TeamMemberDto[]>({
    key: 'selectedTeamMembersAtom',
    default: [],
});

export const connectGoogleWorkspaceCodeAtom = atom<string>({
    key: 'connect/GoogleWorkspace/Code/Atom',
    default: '',
});
