import {TypeCast} from '^types/utils/class-transformer';
import {MoneyDto} from '^models/Money';
import {GmailItemDto} from './index';
import {BillingType} from '^models/InvoiceApp/type';

export class GmailItemBillingInfoDto {
    id: number; // ID
    @TypeCast(() => Date) issuedAt: Date; // 발행일(이메일 수신날짜)
    @TypeCast(() => Date) lastRequestedAt: Date | null; // 최근 결제 요청 일시
    @TypeCast(() => Date) paidAt: Date | null; // 결제 완료 일시
    @TypeCast(() => MoneyDto) payAmount: MoneyDto | null; // 결제금액 | 청구금액
    paymentMethod: string | null; // 결제 수단
    assumedBillingType: BillingType; // 추정 결제주기
    workspaceName: string | null; // 워크스페이스 명

    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => GmailItemDto) gmailItem?: GmailItemDto; // 지메일 아이템
}
