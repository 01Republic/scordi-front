export class CreateNotificationMessageRequestDto {
    notificationTemplateId: number; // 템플릿 아이디
    membershipId: number; // 받는이 아이디
    title: string; // 제목
    content?: string | null; // 내용
    url: string; // 클릭시 이동할 주소
    willSendAt?: Date | null; // 보낼 시각 (null 이면 즉시)
    sentAt?: Date | null; // 보낸 시각
    readAt?: Date | null; // 읽은 시각
    deletedAt?: Date | null; // 삭제 시각
}
