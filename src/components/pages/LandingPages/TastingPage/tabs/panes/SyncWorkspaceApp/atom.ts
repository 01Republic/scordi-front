import {atom} from 'recoil';
import {ReportDto} from './dto/report.dto';

/**
 * SyncWorkspaceApp 구독찾기 데모를 위한
 * 전용 상태를 관리합니다.
 */

export enum ReportLoadingStatus {
    NotLoaded,
    Loading,
    Loaded,
    // Success,
    // Failure,
}

export const reportLoadingStatus = atom<ReportLoadingStatus>({
    key: 'tasting/reportLoadingStatus',
    default: ReportLoadingStatus.NotLoaded,
});

export const reportState = atom<ReportDto | null>({
    key: 'reportState',
    default: null,
});
