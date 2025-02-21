import {TypeCast} from '^types/utils/class-transformer';
import {TeamMemberDto} from '^models/TeamMember';
import {SubscriptionDto} from '^models/Subscription/types';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TeamDto} from '^models/Team/type';
import {PaginationDto} from '^types/utils/pagination.dto';

// 시트 상태 - 미정, 무료, 유료, 해지
export enum SubscriptionSeatStatus {
    NONE = 'NONE', // 미정
    FREE = 'FREE', // 무료
    PAID = 'PAID', // 유료
    QUIT = 'QUIT', // 해지
}

/**
 * 구독별 운영중인 시트
 */
export class SubscriptionSeatDto {
    id: number; // ID
    teamMemberId: number | null; // 팀 멤버 ID
    subscriptionId: number | null; // 구독 ID
    status: SubscriptionSeatStatus; // 시트 상태 (default: 유료)
    isPaid: boolean; // 유/무료 여부 (default: 유료)
    @TypeCast(() => Date) startAt?: Date | null; // 계정부여일
    @TypeCast(() => Date) finishAt?: Date | null; // 계정회수(예정)일
    memo: string | null; // 메모

    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시
    @TypeCast(() => Date) deletedAt?: Date; // 계정회수(완료)일 (soft-delete)

    @TypeCast(() => TeamMemberDto) teamMember?: TeamMemberDto; // 팀 멤버
    @TypeCast(() => SubscriptionDto) subscription?: SubscriptionDto; // 구독
}

export class FindAllSubscriptionSeatQueryDto extends FindAllQueryDto<SubscriptionSeatDto> {
    keyword?: string; // 키워드
    isFinishTargetOnly?: boolean; // 이번 달 회수예정만 검색 요청
}
