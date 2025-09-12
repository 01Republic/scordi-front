import {HTMLAttributeAnchorTarget} from 'react';
import {TypeCast} from '^types/utils/class-transformer';
import {MembershipDto} from '^models/Membership/types';
import {NotificationTemplateDto} from '../../NotificationTemplate/types';

/**
 * 알림 메세지
 */
export class NotificationMessageDto {
    id: number; // 아이디
    notificationTemplateId: number; // 템플릿 아이디
    membershipId: number; // 받는이 아이디
    title: string; // 제목
    content: string | null; // 내용
    url: string; // 클릭시 이동할 주소
    target: HTMLAttributeAnchorTarget; // a태그 target 속성

    @TypeCast(() => Date) willSendAt: Date | null; // 보낼 시각 (null 이면 즉시)
    @TypeCast(() => Date) sentAt: Date | null; // 보낸 시각
    @TypeCast(() => Date) readAt: Date | null; // 읽은 시각
    @TypeCast(() => Date) deletedAt: Date | null; // 삭제 시각
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => MembershipDto) membership?: MembershipDto; // 받는이
    @TypeCast(() => NotificationTemplateDto) notificationTemplate?: NotificationTemplateDto; // 템플릿
}
