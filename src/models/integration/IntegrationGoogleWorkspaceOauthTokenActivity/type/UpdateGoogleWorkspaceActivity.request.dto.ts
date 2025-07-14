export class UpdateGoogleWorkspaceActivityRequestDto {
    // 구독 FK
    subscriptionId?: number;

    // 로그인 앱 이름
    originalAppName?: string;

    // 인증일
    authorizedAt?: Date;
}
