import {TypeCast} from '^types/utils/class-transformer';
import {TeamMemberDto} from '^models/TeamMember';
import {SubscriptionDto} from '^models/Subscription/types';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {TeamDto} from '^models/Team/type';
import {PaginationDto} from '^types/utils/pagination.dto';

/**
 * 구독별 운영중인 시트
 */
export class SubscriptionSeatDto {
    id: number; // ID
    teamMemberId: number | null; // 팀 멤버 ID
    subscriptionId: number | null; // 구독 ID

    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => TeamMemberDto) teamMember?: TeamMemberDto; // 팀 멤버
    @TypeCast(() => SubscriptionDto) subscription?: SubscriptionDto; // 구독
}

export class FindAllSubscriptionSeatQueryDto extends FindAllQueryDto<SubscriptionSeatDto> {
    keyword?: string; // 키워드
}
