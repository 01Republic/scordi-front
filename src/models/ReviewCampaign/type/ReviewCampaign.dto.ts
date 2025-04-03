import {TypeCast} from '^types/utils/class-transformer';
import {OrganizationDto} from '^models/Organization/type';
import {MembershipDto} from '^models/Membership/types';
import {ReviewCampaignSubscriptionDto} from './ReviewCampaignSubscription.dto';

/**
 * 요청 캠페인
 */
export class ReviewCampaignDto {
    id: number;
    organizationId: number; // 조직 ID
    authorId: number | null; // 작성자 FK
    title: string; // 요청 제목
    description: string; // 요청 내용
    @TypeCast(() => Date) startAt: Date; // 시작일시
    @TypeCast(() => Date) finishAt: Date; // 마감일시
    @TypeCast(() => Date) approvedAt: Date | null; // 승인완료일시
    @TypeCast(() => Date) closedAt: Date | null; // 종료된 시각
    @TypeCast(() => ReviewCampaignSubscriptionDto) subscriptions: ReviewCampaignSubscriptionDto[]; // 대상 구독
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => MembershipDto) author?: MembershipDto; // 작성자
}
