// billing schedule / billing history에서 모두 사용되는 types

export class StartEndParams {
    startDate?: string;
    endDate?: string;
}

export class FromToQueryDto {
    from: Date; // 기간 시작일
    to: Date; // 기간 종료일
}

export class IsActiveSubsParams {
    isActiveSubscription?: boolean; // 동기화된 구독만
}
