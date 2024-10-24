import {atom} from 'recoil';
import {ReportDto} from '^tasting/tabs/panes/SyncWorkspaceApp/dto/report.dto';

export const googleWorkspaceAccessTokenAtom = atom<string | null>({
    key: 'googleWorkspaceAccessTokenAtom',
    default: null,
});

export const isLoadedState = atom<boolean>({
    key: 'googleWorkspace/isLoadedState',
    default: false,
});

export const isSavingState = atom<boolean>({
    key: 'isSavingState',
    default: false,
});

export const reportState = atom<ReportDto | null>({
    key: 'reportState/2',
    default: null,
});
