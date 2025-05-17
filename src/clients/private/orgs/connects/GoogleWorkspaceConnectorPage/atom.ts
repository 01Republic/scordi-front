import {atom} from 'recoil';
import {ReportDto} from '^tasting/tabs/panes/SyncWorkspaceApp/dto/report.dto';

export const googleWorkspaceAccessTokenAtom = atom<string | null>({
    key: 'googleWorkspaceAccessTokenAtom/3',
    default: null,
});

export const isLoadedState = atom<boolean>({
    key: 'googleWorkspace/isLoadedState/3',
    default: false,
});

export const isSavingState = atom<boolean>({
    key: 'isSavingState/3',
    default: false,
});

export const reportState = atom<ReportDto | null>({
    key: 'reportState/3',
    default: null,
});
