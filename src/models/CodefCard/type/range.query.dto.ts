export class RangeQueryDto {
    startDate?: string; // 조회시작일 (yyyy-mm-dd)
    endDate?: string; // 조회종료일 (yyyy-mm-dd)
}

export class PatchHistoriesQueryDto extends RangeQueryDto {
    strategy?: 'optimistic' | 'pessimistic'; // 조회전략 (optimistic, pessimistic)
}
