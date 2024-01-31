import {atom} from 'recoil';

// 워크스페이스
// 1. 연동
export const isWorkspaceConnectLoadingAtom = atom<boolean>({
    key: 'workspace/isConnectLoadingAtom',
    default: false,
});

// 2. 동기화
export const isWorkspaceSyncLoadingAtom = atom<boolean>({
    key: 'workspace/isSyncLoadingAtom',
    default: false,
});

// 3. 삭제
export const isWorkspaceDisConnectLoadingAtom = atom<boolean>({
    key: 'workspace/isDeleteLoadingAtom',
    default: false,
});
