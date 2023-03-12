import {BiBlock, BiBot, BiCheckCircle, BiError} from 'react-icons/bi';

export enum SyncHistoryResultStatus {
    IN_PROGRESS = 'in progress',
    SUCCESS = 'success',
    FAILED = 'failed',
    CANCELED = 'canceled',
}

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

export type ApplicationSyncHistoryDto = {
    id: number;
    applicationId: number;
    resultStatus: SyncHistoryResultStatus;
    createdAt: string;
    updatedAt: string;
    finishedAt: string | null;
};

export function restartSyncButtonIsActive(history: ApplicationSyncHistoryDto) {
    if (history.resultStatus === SyncHistoryResultStatus.IN_PROGRESS) return false;
    return true;
}

export const mockSyncHistoryList: ApplicationSyncHistoryDto[] = [
    // {
    //     id: 315,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.IN_PROGRESS,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: null,
    // },
    // {
    //     id: 314,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 313,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.CANCELED,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 312,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.FAILED,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 311,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.CANCELED,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 310,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.FAILED,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 308,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 307,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 306,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 305,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 304,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 303,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 303,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 302,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    // {
    //     id: 301,
    //     applicationId: 7,
    //     resultStatus: SyncHistoryResultStatus.SUCCESS,
    //     createdAt: new Date('2023-03-07').toISOString(),
    //     updatedAt: new Date('2023-03-07').toISOString(),
    //     finishedAt: new Date('2023-03-07').toISOString(),
    // },
    {
        id: 300,
        applicationId: 7,
        resultStatus: SyncHistoryResultStatus.SUCCESS,
        createdAt: new Date('2023-03-07').toISOString(),
        updatedAt: new Date('2023-03-07').toISOString(),
        finishedAt: new Date('2023-03-07').toISOString(),
    },
];
