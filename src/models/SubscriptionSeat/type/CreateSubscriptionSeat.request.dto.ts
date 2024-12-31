import {SubscriptionSeatStatus} from '^models/SubscriptionSeat/type/SubscriptionSeat.dto';

export class CreateSubscriptionSeatRequestDto {
    teamMemberId?: number;
    subscriptionId?: number;
    status?: SubscriptionSeatStatus; // 시트 상태 (default: 유료)
    isPaid?: boolean; // 유/무료 여부 (default: 유료)
    startAt?: Date | null; // 계정부여일
    finishAt?: Date | null; // 계정회수(예정)일
    memo?: string | null; // 메모
}
