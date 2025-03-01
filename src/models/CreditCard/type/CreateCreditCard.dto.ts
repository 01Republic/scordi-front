import {TeamMemberDto} from '^models/TeamMember';
import {CreditCardUsingStatus} from './CreditCardUsingStatus.enum';

export class CreateCreditCardDto {
    sign: string;
    name?: string | null;
    issuerCompany?: string | null;
    networkCompany?: string | null;
    memo?: string | null;
    usingStatus?: CreditCardUsingStatus; // 사용상태
    isPersonal?: boolean | null;
    isCreditCard?: boolean; // 신용카드 여부
    bankAccountId?: number | null; // 계좌 ID
    holdingMemberId?: number | null; // 카드 소유자 ID
    holdingMember?: TeamMemberDto;
    productIds?: number[] | null;
    //
    number1?: string;
    number2?: string;
    number3?: string;
    number4?: string;
    //
    expiry?: string;
}
