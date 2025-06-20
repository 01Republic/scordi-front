import {TypeCast} from '^types/utils/class-transformer';
import {NotificationMessageDto} from '^models/_notification/NotificationMessage/types';
import {NotificationTemplateAbout} from './NotificationTemplateAbout.enum';

/**
 * 알림 템플릿
 */
export class NotificationTemplateDto {
    id: number; // 아이디
    title: string; // 템플릿 이름
    about: NotificationTemplateAbout; // 템플릿 구분 - 일부러 Enum 안씀
    titleTemplate: string; // 제목템플릿
    contentTemplate: string | null; // 본문템플릿

    @TypeCast(() => Date) activatedAt: Date | null; // 활성화 시각
    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => NotificationMessageDto)
    notificationMessages?: NotificationMessageDto[]; // 메세지 목록
}
