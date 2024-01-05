import {OrganizationDto} from '^models/Organization/type';
import {TypeCast} from '^types/utils/class-transformer';
import {TeamMemberDto} from '^models/TeamMember/type';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {cardSign} from '^config/environments';
import CryptoJS from 'crypto-js';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {BillingHistoryDto} from '^models/BillingHistory/type';

export class CreditCardDto {
    id: number; // 카드 ID
    sign: string; // 카드 정보(카드번호, 비밀번호, 유효기간, CVC)
    name?: string | null; // 카드 이름
    issuerCompany?: string | null; // 카드 발급사
    networkCompany?: string | null; // 카드 결제 네트워크
    memo?: string | null; // 메모
    isPersonal: boolean; // 법인 카드 여부
    organizationId: number; // 조직 ID
    @TypeCast(() => OrganizationDto) organization?: OrganizationDto | null; // 조직
    holdingMemberId?: number | null; // 카드 소유자 ID
    @TypeCast(() => TeamMemberDto) holdingMember?: TeamMemberDto | null; // 카드 소유자
    @TypeCast(() => SubscriptionDto) subscriptions?: SubscriptionDto[] | null; // 결제한 구독 목록
    @TypeCast(() => BillingHistoryDto) billingHistories?: BillingHistoryDto[] | null; // 결제 내역

    decryptSign(): CreditCardSecretInfo {
        const json = CryptoJS.AES.decrypt(this.sign, cardSign).toString(CryptoJS.enc.Utf8);
        return JSON.parse(json) as CreditCardSecretInfo;
    }

    get secretInfo(): CreditCardSecretInfo {
        return this.decryptSign();
    }

    get label(): string {
        return `${this.name} / ${this.company} ${this.endNumber}`;
    }

    private get company(): string | null {
        return this.issuerCompany || this.networkCompany || null;
    }

    get numbers(): CreditCardNumber {
        const secretInfo = this.secretInfo;
        return {
            number1: secretInfo.number1,
            number2: secretInfo.number2,
            number3: secretInfo.number3,
            number4: secretInfo.number4,
        };
    }

    private get endNumber(): string {
        const number4 = this.secretInfo.number4 || '****';
        return `${number4}`;
    }

    get fullNumber(): string {
        const number1 = this.secretInfo.number1 || '****';
        const number2 = this.secretInfo.number2 || '****';
        const number3 = this.secretInfo.number3 || '****';
        const number4 = this.secretInfo.number4 || '****';

        return `${number1}-${number2}-${number3}-${number4}`;
    }

    get isFromInvoice(): boolean {
        return this.fullNumber.includes('****');
    }
}

export class CreditCardSecretInfo {
    number1?: string | null;
    number2?: string | null;
    number3?: string | null;
    number4?: string | null;
    password?: string;
    cvc?: string;
    expiry?: string;

    get fullNumber(): string {
        const number1 = this.number1 || '****';
        const number2 = this.number2 || '****';
        const number3 = this.number3 || '****';
        const number4 = this.number4 || '****';

        return `${number1}-${number2}-${number3}-${number4}`;
    }
}

export type CreditCardNumber = Pick<CreditCardSecretInfo, 'number1' | 'number2' | 'number3' | 'number4'>;

export class UnSignedCreditCardFormData extends CreditCardSecretInfo {
    name?: string | null;
    issuerCompany?: string | null;
    networkCompany?: string | null;
    memo?: string | null;
    isPersonal?: boolean | null;
    holdingMemberId?: number | null;
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
            isPersonal: this.isPersonal,
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
            isPersonal: this.isPersonal,
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

export type CreateCreditCardDto = {
    sign: string;
    name?: string | null;
    issuerCompany?: string | null;
    networkCompany?: string | null;
    memo?: string | null;
    isPersonal?: boolean | null;
    holdingMemberId?: number | null;
    holdingMember?: TeamMemberDto;
    productIds?: number[] | null;
};

export type UpdateCreditCardDto = {
    sign?: string;
    name?: string | null;
    issuerCompany?: string | null;
    networkCompany?: string | null;
    memo?: string | null;
    isPersonal?: boolean | null;
    holdingMemberId?: number | null;
    holdingMember?: TeamMemberDto;
    productIds?: number[] | null;
};

export type FindAllCreditCardDto = FindAllQueryDto<CreditCardDto> & {
    keyword?: string;
};
