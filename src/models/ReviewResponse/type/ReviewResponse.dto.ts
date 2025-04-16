import {TypeCast} from '^types/utils/class-transformer';
import {OrganizationDto} from '^models/Organization/type';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type/ReviewCampaign.dto';
import {TeamMemberDto} from '^models/TeamMember';
import {format} from 'date-fns';
import {ReviewResponseSubscriptionDto} from './ReviewResponseSubscription.dto';

/**
 * 요청 캠페인 응답지
 */
export class ReviewResponseDto {
    id: number; // ID
    organizationId: number; // 조직 ID
    campaignId: number; // 요청 캠페인 ID
    teamMemberId: number | null; // 응답자 FK (팀멤버가 삭제된 경우 null)
    @TypeCast(() => Date) lastSentAt: Date | null; // 마지막 발송일시
    @TypeCast(() => Date) submittedAt: Date | null; // 제출된 시각
    respondentName: string | null; // 응답자 이름 - 기록용. 아직 응답하지 않은 경우 null. 회원도 동일
    respondentEmail: string | null; // 응답자 이메일 - 기록용. 아직 응답하지 않은 경우 null. 회원도 동일
    respondentTeamId: number | null; // 응답자 소속 팀 - 기록용. 아직 응답하지 않은 경우 null. 회원도 동일
    subscriptions?: ReviewResponseSubscriptionDto[]; // 대상 구독 응답
    otherSubscriptionComment: string | null; // 새롭게 이용중인 구독서비스 추가 제안
    inquiry: string | null; // 기타 문의
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto; // 조직
    @TypeCast(() => ReviewCampaignDto) campaign?: ReviewCampaignDto; // 요청 캠페인
    @TypeCast(() => TeamMemberDto) teamMember?: TeamMemberDto; // 응답자

    get statusText() {
        const yyyyMMDdHHMm = 'yyyy-MM-dd HH:mm';
        if (this.submittedAt) return `${format(this.submittedAt, yyyyMMDdHHMm)} 에 제출됨 ✅`;
        if (this.lastSentAt) return `${format(this.lastSentAt, yyyyMMDdHHMm)} 에 알림 📣`;
        return '미발송';
    }
}
