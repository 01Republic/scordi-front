// ConnectStatus 연동상태.
export enum ConnectStatus {
    applied = 'APPLIED',
    pending = 'PENDING',
    success = 'SUCCESS',
    failure = 'FAILURE',
}

export function t_ConnectStatus(status: ConnectStatus) {
    switch (status) {
        case ConnectStatus.applied:
            return '연동(준비중)';
        case ConnectStatus.pending:
            return '연동(처리중)';
        case ConnectStatus.success:
            return `연동 완료(자동)`;
        case ConnectStatus.failure:
            return '연동(오류)';
        default:
            return '';
    }
}
