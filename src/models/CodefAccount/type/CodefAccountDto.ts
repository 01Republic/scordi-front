import {
    CodefCardCompanyCode,
    CodefCustomerType,
    CodefLoginType,
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

    // 생성일시
    createdAt: Date;

    // 수정일시
    updatedAt: Date;

    // 커넥티드 아이디
    @TypeCast(() => CodefConnectedIdentityDto)
    connectedIdentity?: CodefConnectedIdentityDto;

    // 등록된 카드
    @TypeCast(() => CodefCardDto)
    codefCards?: CodefCardDto[];

    // 등록된 카드
    @TypeCast(() => CreditCardDto)
    creditCards?: CreditCardDto[];
}
