import {InvoiceDataDto} from '^components/ApplicationConnectStage/dto/fetched.responses.dto';
import {TypeCast} from '^types/utils/class-transformer';

export class CreateSubscriptionByInvoicesRequestDto {
    displayName: string; // 조직이름 (연동서비스 내에서)
    organizationId: number; // 조직 ID
    productId: number; // 프로토타입 ID
    paymentPlanId: number; // 결제플랜 ID
    billingCycleId: number; // 결제주기 ID
    isFreeTier: boolean; // 프리티어 여부
    registeredAt: Date | string; // 사용시작일
    paidMemberCount: number; // 결제되는 사용자 수
    @TypeCast(() => InvoiceDataDto) invoiceDataList: InvoiceDataDto[];
}
