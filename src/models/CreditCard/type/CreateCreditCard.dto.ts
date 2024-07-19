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
    holdingMemberId?: number | null;
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
