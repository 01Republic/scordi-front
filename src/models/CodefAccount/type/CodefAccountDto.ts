import {
    CodefCardCompanyCode,
    CodefClientTypeLevel,
    CodefCustomerType,
    CodefLoginType,
    CodefLoginTypeLevel,
    CodefRequestBusinessType,
} from '^models/CodefAccount/type/enums';
import {TypeCast} from '^types/utils/class-transformer';
import {CodefConnectedIdentityDto} from '^models/CodefConnectedIdentity/type/CodefConnectedIdentityDto';
import {CreditCardDto} from '^models/CreditCard/type';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

/** [Codef] 계정 */
export class CodefAccountDto {
    // ID
    id: number;

    // 커넥티드 아이디 FK
    connectedIdentityId: number;

    // 국가코드 (한국 : KR)
    countryCode: string;

    // 고객 구분 (개인: P, 기업/법인: B, 통합: A)
    clientType: CodefCustomerType;

    // 기관코드 (기관코드는 서버 참조)
    organization: CodefCardCompanyCode;

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

    @TypeCast(() => Date) createdAt: Date; // 생성일시
    @TypeCast(() => Date) updatedAt: Date; // 수정일시

    @TypeCast(() => CodefConnectedIdentityDto) connectedIdentity?: CodefConnectedIdentityDto; // 커넥티드 아이디
    @TypeCast(() => CodefCardDto) codefCards?: CodefCardDto[]; // 등록된 카드
    @TypeCast(() => CreditCardDto) creditCards?: CreditCardDto[]; // 등록된 카드
}
