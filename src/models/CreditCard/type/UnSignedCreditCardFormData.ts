import {TeamMemberDto} from '^models/TeamMember';
import CryptoJS from 'crypto-js';
import {cardSign} from '^config/environments';
import {CreditCardSecretInfo} from './CreditCardSecretInfo';
import {CreditCardUsingStatus} from './CreditCardUsingStatus.enum';
import {UpdateCreditCardDto} from './UpdateCreditCard.dto';
import {CreateCreditCardDto} from './CreateCreditCard.dto';

export class UnSignedCreditCardFormData extends CreditCardSecretInfo {
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

    get sign(): string {
        const json = JSON.stringify({...this.secretInfo});
        return CryptoJS.AES.encrypt(json, cardSign).toString();
    }

    toCreateDto(): CreateCreditCardDto {
        return {
            sign: this.sign,
            name: this.name,
            issuerCompany: this.issuerCompany,
            networkCompany: this.networkCompany,
            memo: this.memo,
            usingStatus: this.usingStatus,
            isPersonal: this.isPersonal,
            isCreditCard: this.isCreditCard,
            bankAccountId: this.bankAccountId,
            holdingMemberId: this.holdingMemberId,
            holdingMember: this.holdingMember,
            productIds: this.productIds,
        };
    }

    toUpdateDto(): UpdateCreditCardDto {
        return {
            sign: this.sign,
            name: this.name,
            issuerCompany: this.issuerCompany,
            networkCompany: this.networkCompany,
            memo: this.memo,
            usingStatus: this.usingStatus,
            isPersonal: this.isPersonal,
            isCreditCard: this.isCreditCard,
            bankAccountId: this.bankAccountId,
            holdingMemberId: this.holdingMemberId,
            holdingMember: this.holdingMember,
            productIds: this.productIds,
        };
    }

    private get secretInfo(): Omit<CreditCardSecretInfo, 'fullNumber'> {
        return {
            number1: this.number1,
            number2: this.number2,
            number3: this.number3,
            number4: this.number4,
            password: this.password,
            cvc: this.cvc,
            expiry: this.expiry,
        };
    }
}
