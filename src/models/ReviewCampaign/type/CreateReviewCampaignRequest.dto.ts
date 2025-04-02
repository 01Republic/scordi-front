import {TypeCast} from '^types/utils/class-transformer';

/**
 * 신규 요청 캠페인 생성 폼 데이터
 */
export class CreateReviewCampaignRequestDto {
    title: string; // 요청 제목
    description: string; // 요청 내용
    @TypeCast(() => Date) finishAt: Date; // 마감일시
    teamMemberIds: number[]; // 응답 대상자 리스트
}
