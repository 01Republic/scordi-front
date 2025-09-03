import {NotificationTemplateAbout} from './NotificationTemplateAbout.enum';

export class CreateNotificationTemplateRequestDto {
    title: string; // 템플릿 이름
    about: NotificationTemplateAbout; // 템플릿 구분 - 일부러 Enum 안씀
    titleTemplate: string; // 제목템플릿
    contentTemplate: string | null; // 본문템플릿
    activatedAt: Date | null; // 활성화 시각
}
