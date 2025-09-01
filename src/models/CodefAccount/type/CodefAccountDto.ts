import {TypeCast} from '^types/utils/class-transformer';
import {CodefConnectedIdentityDto} from '^models/CodefConnectedIdentity/type/CodefConnectedIdentityDto';
import {CreditCardDto} from '^models/CreditCard/type';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {OrganizationDto} from '^models/Organization/type';
import {BankAccountsStaticData} from '../bank-account-static-data';
import {CardAccountsStaticData} from '../card-accounts-static-data';
import {
    CodefBankCode,
    CodefCardCompanyCode,
    CodefClientTypeLevel,
    CodefCustomerType,
    CodefLoginType,
    CodefLoginTypeLevel,
    CodefRequestBusinessType,
    t_codefCustomerType,
} from './enums';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {BankAccountDto} from '^models/BankAccount/type';

/** [Codef] 계정 */
export class CodefAccountDto {
    // ID
    id: number;

    // 커넥티드 아이디 FK
    connectedIdentityId: number | null;

    // 조직 FK
    orgId: number;

    // 국가코드 (한국 : KR)
    countryCode: string;

    // 고객 구분 (개인: P, 기업/법인: B, 통합: A)
    clientType: CodefCustomerType;

    // 기관코드 (기관코드는 서버 참조)
    organization: CodefCardCompanyCode | CodefBankCode;

    // 기관명
    company: string;

    // 업무 구분 (은행/저축은행: BK, 카드: CD, 증권: ST, 보험: IS)
    businessType: CodefRequestBusinessType;

    // 로그인 방식 (인증서: 0, 아이디/패스워드: 1)
    loginType: CodefLoginType;

    // 로그인구분 - [신한/롯데 법인카드의 경우] “0”:USER, “1”:BRANCH, “2”:ADMIN
    loginTypeLevel?: CodefLoginTypeLevel;

    // 의뢰인구분(회원구분) - [회원구분(신한카드만 사용)] “0”:신용카드회원, “1”:체크카드회원, “2”:연구비신용카드회원, “3”:프리플러스회원
    clientTypeLevel?: CodefClientTypeLevel;

    errorData?: {
        code: string;
        message: string;
        extraMessage: string;
        transactionId?: string;
    };

    //연동된 코드에프 카드/계좌 개수
    codefAssetCount: number;
    //연동된 스코디 카드/계좌 개수
    assetCount: number;

    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => CodefConnectedIdentityDto) connectedIdentity?: CodefConnectedIdentityDto; // 커넥티드 아이디
    @TypeCast(() => OrganizationDto) org?: OrganizationDto; // 조직
    @TypeCast(() => CodefCardDto) codefCards?: CodefCardDto[]; // 연동된 카드
    @TypeCast(() => CreditCardDto) creditCards?: CreditCardDto[]; // 등록된 카드
    @TypeCast(() => CodefBankAccountDto) codefBankAccounts?: CodefBankAccountDto[]; // 연동된 계좌
    @TypeCast(() => BankAccountDto) bankAccounts?: BankAccountDto[]; // 등록된 계좌

    get profile() {
        if (!this.connectedIdentityId) return `${this.company ? `${this.company} ` : ''}(엑셀등록 가계정)`;
        return `${this.company} (${t_codefCustomerType(this.clientType)})`;
    }

    get isBankCompany() {
        return this.businessType === CodefRequestBusinessType.Bank;
    }

    get isCardCompany() {
        return this.businessType === CodefRequestBusinessType.Card;
    }

    get companyData() {
        const param = this.organization;
        if (this.isBankCompany) return BankAccountsStaticData.findOne(param);
        if (this.isCardCompany) return CardAccountsStaticData.findOne(param);
        return undefined;
    }
}
