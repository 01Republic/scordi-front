import {atom} from 'recoil';
import {ReportDto} from './panes/SyncWorkspaceApp/dto/report.dto';

/**
 * 데모페이지의 전역적인 범주의 상태를 다룹니다.
 * 개별 앱들이 아닌 보다 상위차원의 상태입니다.
 */

export enum TastingTabs {
    SyncWorkspace,
    InvoiceTracker,
}

export const navTabIndex = atom<TastingTabs>({
    key: 'tasting/navTabIndex',
    default: TastingTabs.SyncWorkspace,
});

export const connectIsLoadingState = atom<boolean>({
    key: 'connectIsLoadingState',
    default: false,
});
