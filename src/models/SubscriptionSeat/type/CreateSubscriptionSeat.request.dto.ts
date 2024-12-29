export class CreateSubscriptionSeatRequestDto {
    teamMemberId?: number;
    subscriptionId?: number;
    startAt?: Date | null; // 계정부여일
    finishAt?: Date | null; // 계정회수(예정)일
    memo?: string | null; // 메모
}
