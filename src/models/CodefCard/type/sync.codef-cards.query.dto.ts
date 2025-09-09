export class SyncCodefCardsQueryDto {
    // '값이 주어지면 특정조직을 대상으로 실행하며',
    // '값이 주어지지 않으면 전체 조직을 대상으로 실행합니다.',
    orgId?: number;

    // '값이 주어지면 특정구독을 대상으로 실행하며',
    // '값이 주어지지 않으면 전체 파서를 대상으로 실행합니다.',
    parserId?: number;

    slackMute?: boolean;
}
