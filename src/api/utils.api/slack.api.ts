import {api} from '^api/api';

class SlackNotificationField {
    label!: string;
    value!: string;
}

class SlackNotificationActionButton {
    text!: string; // 버튼텍스트
    url!: string; // 버튼링크
}

export class SlackNotificationContent {
    title!: string; // 제목
    fields!: SlackNotificationField[]; // 내용
    buttons?: SlackNotificationActionButton[]; // 액션버튼
}

export const sendSlackNotificationApi = (body: SlackNotificationContent) => {
    return api.post('/slack-notification', body);
};
