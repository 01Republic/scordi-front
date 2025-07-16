import {atom} from 'recoil';
import {IntegrationGoogleWorkspaceWorkspaceDto} from '^models/integration/IntegrationGoogleWorkspaceWorkspace/type';
import {IntegrationGoogleWorkspaceMemberDto} from '^models/integration/IntegrationGoogleWorkspaceMember/type/IntegrationGoogleWorkspaceMember.dto';

export const selectedGoogleWorkspaceAtom = atom<IntegrationGoogleWorkspaceWorkspaceDto | undefined>({
    key: 'admin/selectedGoogleWorkspaceAtom',
    default: undefined,
});

export const selectedGoogleWorkspaceMemberAtom = atom<IntegrationGoogleWorkspaceMemberDto | undefined>({
    key: 'admin/selectedGoogleWorkspaceMemberAtom',
    default: undefined,
});
