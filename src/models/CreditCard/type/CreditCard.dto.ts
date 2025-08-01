import CryptoJS from 'crypto-js';
import {cardSign} from '^config/environments';
import {TypeCast} from '^types/utils/class-transformer';
import {OrganizationDto} from '^models/Organization/type';
import {TeamMemberDto} from '^models/TeamMember';
import {TeamDto} from '^models/Team/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CreditCardUsingStatus} from './CreditCardUsingStatus.enum';
import {CreditCardSecretInfo} from './CreditCardSecretInfo';
import {CreditCardNumber} from './CreditCardNumber.type';
import {BankAccountDto} from '^models/BankAccount/type';

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
    bankAccountId?: number | null; // 계좌 ID
    holdingMemberId?: number | null; // 카드 소유자 ID
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => OrganizationDto) organization?: OrganizationDto | null; // 조직
    @TypeCast(() => BankAccountDto) bankAccount?: BankAccountDto | null; // 계좌
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
        return CardAccountsStaticData.findByPersonal(this.isPersonal).find(
            (data) => this.issuerCompany === data.displayName,
        );
    }

    get profileName() {
        if (this.name) return this.name;
        if (this.issuerCompany) return this.issuerCompany;

        const company = this.company;
        if (company) return company.displayName.replace('카드', '').replace('card', '');
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

    //Amex 카드로 인해 만들었음

    /* Amex 카드 여부 판별 */
    get isAmexCard(): boolean {
        const firstSegment = this.secretInfo.number1 || '';
        return firstSegment.startsWith('37');
    }

    get stored(): string[] {
        const {number1, number2, number3, number4} = this.numbers;
        return [number1 || '', number2 || '', number3 || '', number4 || ''];
    }

    get maskingEndNumber(): string {
        const [, , number3, number4] = this.stored;
        if (this.isAmexCard) {
            return (number3.slice(2) || '**') + (number4 || '***');
        }

        return number4 || '****';
    }

    get noMaskingEndNumber(): string {
        const [, , number3, number4] = this.stored;
        if (this.isAmexCard) {
            return number3.slice(2) + number4;
        }

        return number4;
    }

    // input 에 개별적인 값을 넣을 수 있도록 map 하기 위해 배열로 만듬..
    get arrayFullNumber(): string[] {
        const [number1, number2, number3, number4] = this.stored;

        if (this.isAmexCard) {
            const display2 = (number2 || '****') + (number3.slice(0, 2) || '**');
            const display3 = (number3.slice(2) || '**') + (number4 || '***');

            return [number1, display2, display3];
        }
        return [number1, number2, number3, number4];
    }

    /* 화면 표시용 전체 번호 */
    get displayFullNumber(): string {
        return this.arrayFullNumber.join('-');
    }
}
