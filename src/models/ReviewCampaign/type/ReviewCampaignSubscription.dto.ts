/**
 * 요청 캠페인의 대상 구독
 */
export class ReviewCampaignSubscriptionDto {
    subscriptionId: number; // 구독 ID
    subscriptionName: string; // 구독명
    productId: number; // 서비스 ID
    productName: string; // 서비스명
    productImage: string; // 서비스 로고 이미지
}
