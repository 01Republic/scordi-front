import {OrganizationDto} from '^models/Organization/type';
import {TypeCast} from '^types/utils/class-transformer';
import {TeamMemberDto} from '^models/TeamMember/type';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {cardSign} from '^config/environments';
import CryptoJS from 'crypto-js';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {PartialType} from '^types/utils/partial-type';
import {TeamCreditCardDto} from '^models/TeamCreditCard/type/TeamCreditCard.dto';
import {TeamDto} from '^models/Team/type';

const CardCompanies = cardAccountsStaticData;

export enum CreditCardUsingStatus {
    UnDef, // undefined (default)
    NoUse, // 미사용
    InUse, // 사용중
    Expired, // 만료
}

export const creditCardUsingStatus = {
    '': CreditCardUsingStatus.UnDef,
    미사용: CreditCardUsingStatus.UnDef,
    사용중: CreditCardUsingStatus.InUse,
    만료: CreditCardUsingStatus.Expired,
};

export function t_creditCardUsingStatus(value: CreditCardUsingStatus) {
    return (
        {
            [CreditCardUsingStatus.UnDef]: '미정',
            [CreditCardUsingStatus.NoUse]: '미사용',
            [CreditCardUsingStatus.InUse]: '사용중',
            [CreditCardUsingStatus.Expired]: '만료됨',
        }[value] || '???'
    );
}

export class CreditCardDto {
    id: number; // 카드 ID
    expireYear: number | null; // 만료 년도 (readonly)
    expireMonth: number | null; // 만료 월 (readonly)
    sign: string; // 카드 정보(카드번호, 비밀번호, 유효기간, CVC)
    name?: string | null; // 카드 이름
    issuerCompany?: string | null; // 카드 발급사
    networkCompany?: string | null; // 카드 결제 네트워크
    memo?: string | null; // 메모
    usingStatus: CreditCardUsingStatus; // 사용상태
    isPersonal: boolean; // 법인카드 여부
    isCreditCard: boolean; // 신용카드 여부
    organizationId: number; // 조직 ID
    holdingMemberId?: number | null; // 카드 소유자 ID
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto | null; // 조직
    @TypeCast(() => TeamMemberDto) holdingMember?: TeamMemberDto | null; // 카드 소유자
    // @TypeCast(() => TeamCreditCardDto) teamCreditCards?: TeamCreditCardDto[]; // 카드를 사용하고 있는 팀 목록
    @TypeCast(() => TeamDto) teams?: TeamDto[]; // 사용하고 있는 카드 목록
    @TypeCast(() => SubscriptionDto) subscriptions?: SubscriptionDto[] | null; // 결제한 구독 목록
    @TypeCast(() => BillingHistoryDto) billingHistories?: BillingHistoryDto[] | null; // 결제 내역

    decryptSign(): CreditCardSecretInfo {
        const json = CryptoJS.AES.decrypt(this.sign, cardSign).toString(CryptoJS.enc.Utf8);
        return JSON.parse(json) as CreditCardSecretInfo;
    }

    get secretInfo(): CreditCardSecretInfo {
        return this.decryptSign();
    }

    get company() {
        return CardCompanies.find((data) => this.issuerCompany === data.displayName);
    }

    get label(): string {
        return `${this.name} / ${this.companyText} ${this.endNumber}`;
    }

    private get companyText(): string | null {
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
    number1?: string;
    number2?: string;
    number3?: string;
    number4?: string;
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
    usingStatus?: CreditCardUsingStatus; // 사용상태
    isPersonal?: boolean | null;
    isCreditCard?: boolean; // 신용카드 여부
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
            usingStatus: this.usingStatus,
            isPersonal: this.isPersonal,
            isCreditCard: this.isCreditCard,
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

export class UpdateCreditCardDto extends PartialType(CreateCreditCardDto) {}

export type FindAllCreditCardDto = FindAllQueryDto<CreditCardDto> & {
    keyword?: string;
};
