import {BiBlock, BiBot, BiCheckCircle, BiError} from '^components/react-icons';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {UserDto} from '^types/user.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export enum SyncHistoryResultStatus {
    IN_PROGRESS = 'in progress',
    SUCCESS = 'success',
    FAILED = 'failed',
    CANCELED = 'canceled',
}

export class SyncHistoryDto {
    id: number;
    subscriptionId: number; // 구독 ID
    runnerId: number | null; // 실행자 ID
    isScheduled: boolean; // 정기실행여부
    content: string; // 실행주요내용
    resultStatus: SyncHistoryResultStatus; // 실행결과상태
    createdAt: string; // 생성일시 (실행시작일시)
    updatedAt: string;
    finishedAt: string | null; // 완료일시

    // relation

    subscription?: SubscriptionDto; // 대상 구독
    runner?: UserDto; // 실행자
}

export type FindAllSyncHistoryQuery = FindAllQueryDto<SyncHistoryDto> & {};

export type CreateSyncHistoryDto = {
    runnerId?: number; // 실행자 ID
    content?: string; // 실행주요내용
};

export type UpdateSyncHistoryDto = Partial<CreateSyncHistoryDto> & {
    subscriptionId?: number; // 구독 ID
    isScheduled?: boolean; // 정기실행여부
    resultStatus?: SyncHistoryResultStatus; // 실행결과상태
    finishedAt?: Date; // 완료일시
};

export function t_syncHistoryResultStatus(status: SyncHistoryResultStatus) {
    return {
        [SyncHistoryResultStatus.IN_PROGRESS]: 'In progress',
        [SyncHistoryResultStatus.SUCCESS]: 'Success',
        [SyncHistoryResultStatus.FAILED]: 'Failure',
        [SyncHistoryResultStatus.CANCELED]: 'Canceled',
    }[status];
}

export const syncHistoryAssets = {
    [SyncHistoryResultStatus.IN_PROGRESS]: {normal: 'violet-300', darken: 'violet-600', Icon: BiBot},
    [SyncHistoryResultStatus.SUCCESS]: {normal: 'green-300', darken: 'green-600', Icon: BiCheckCircle},
    [SyncHistoryResultStatus.FAILED]: {normal: 'red-300', darken: 'red-600', Icon: BiError},
    [SyncHistoryResultStatus.CANCELED]: {normal: 'gray-300', darken: 'gray-600', Icon: BiBlock},
};

export function restartSyncButtonIsActive(history: SyncHistoryDto) {
    if (history.resultStatus === SyncHistoryResultStatus.IN_PROGRESS) return false;
    return true;
}

export const mockSyncHistoryList: SyncHistoryDto[] = [
    {
        id: 315,
        subscriptionId: 7,
        resultStatus: SyncHistoryResultStatus.IN_PROGRESS,
        runnerId: null,
        isScheduled: true,
        content: '',
        createdAt: new Date('2023-03-13T08:33:00Z').toISOString(),
        updatedAt: new Date('2023-03-07').toISOString(),
        finishedAt: null,
    },
    // {
    //     id: 314,
    //     subscriptionId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     runnerId: null,
    //     isScheduled: true,
    //     content: '',
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    {
        id: 313,
        subscriptionId: 7,
        resultStatus: SyncHistoryResultStatus.CANCELED,
        runnerId: null,
        isScheduled: true,
        content: '',
        createdAt: new Date('2023-03-13T08:00:00Z').toISOString(),
        updatedAt: new Date('2023-03-07').toISOString(),
        finishedAt: new Date('2023-03-13T09:33:15Z').toISOString(),
    },
    {
        id: 312,
        subscriptionId: 7,
        resultStatus: SyncHistoryResultStatus.FAILED,
        runnerId: null,
        isScheduled: true,
        content: '',
        createdAt: new Date('2023-03-07').toISOString(),
        updatedAt: new Date('2023-03-07').toISOString(),
        finishedAt: new Date('2023-03-07').toISOString(),
    },
    // {
    //     id: 311,
    //     subscriptionId: 7,
    //     resultStatus: SyncHistoryResultStatus.CANCELED,
    //     runnerId: null,
    //     isScheduled: true,
    //     content: '',
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 310,
    //     subscriptionId: 7,
    //     resultStatus: SyncHistoryResultStatus.FAILED,
    //     runnerId: null,
    //     isScheduled: true,
    //     content: '',
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 308,
    //     subscriptionId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     runnerId: null,
    //     isScheduled: true,
    //     content: '',
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 307,
    //     subscriptionId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     runnerId: null,
    //     isScheduled: true,
    //     content: '',
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 306,
    //     subscriptionId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     runnerId: null,
    //     isScheduled: true,
    //     content: '',
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 305,
    //     subscriptionId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     runnerId: null,
    //     isScheduled: true,
    //     content: '',
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 304,
    //     subscriptionId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     runnerId: null,
    //     isScheduled: true,
    //     content: '',
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 303,
    //     subscriptionId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     runnerId: null,
    //     isScheduled: true,
    //     content: '',
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 303,
    //     subscriptionId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     runnerId: null,
    //     isScheduled: true,
    //     content: '',
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 302,
    //     subscriptionId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     runnerId: null,
    //     isScheduled: true,
    //     content: '',
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 301,
    //     subscriptionId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     runnerId: null,
    //     isScheduled: true,
    //     content: '',
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    {
        id: 300,
        subscriptionId: 7,
        resultStatus: SyncHistoryResultStatus.SUCCESS,
        runnerId: null,
        isScheduled: true,
        content: '',
        createdAt: new Date('2023-03-07').toISOString(),
        updatedAt: new Date('2023-03-07').toISOString(),
        finishedAt: new Date('2023-03-07').toISOString(),
    },
];
