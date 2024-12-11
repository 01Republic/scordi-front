import {atom} from 'recoil';

export const connectGoogleWorkspaceCodeAtom = atom<string>({
    key: 'connect/GoogleWorkspace/Code/Atom',
    default: '',
});
