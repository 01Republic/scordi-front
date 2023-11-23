import {atom} from 'recoil';
import {ReportDto} from './dto/report.dto';
import {ReportGroupedByProductDto} from './dto/view-types/group-by-product/report.grouped-by-product.dto';
import {ReportGroupedByProductItemDto} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/view-types/group-by-product/report.grouped-by-product-item.dto';

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

export const reportGroupedByProductState = atom<ReportGroupedByProductDto | null>({
    key: 'reportGroupedByProductState',
    default: null,
});

export const subjectReportProductItem = atom<ReportGroupedByProductItemDto | null>({
    key: 'subjectReportProductItem',
    default: null,
});

export const reportItemModalIsShow = atom<boolean>({
    key: 'reportItemModalIsShow',
    default: false,
});
