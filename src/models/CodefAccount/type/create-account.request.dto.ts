import {
    CodefBankCode,
    CodefCardCompanyCode,
    CodefCertificateType,
    CodefClientTypeLevel,
    CodefCustomerType,
    CodefLoginType,
    CodefLoginTypeLevel,
    CodefRequestBusinessType,
} from './enums';

export class CreateAccountRequestDto {
    businessType: CodefRequestBusinessType; // 업무 구분 (은행/카드)
    organization: CodefCardCompanyCode | CodefBankCode; // 기관코드
    clientType: CodefCustomerType; // 고객구분(개인 / 법인)
    loginType: CodefLoginType; // 로그인 방식 (인증서/아이디)
    certType?: CodefCertificateType; // 인증서 구분(기본인증서, pfx)
    certFile?: string; // 인증서 pfx 파일
    id = ''; // 아이디
    password: string; // 비밀번호 - 아이디로 로그인시 아이디에 대응되는 패스워드 / 인증서로 로그인시 인증서에 대응하는 패스워드
    loginTypeLevel?: CodefLoginTypeLevel; // 로그인구분 - 신한/롯데 법인카드의 경우
    clientTypeLevel?: CodefClientTypeLevel; // 의뢰인구분 - 신한 법인카드의 경우
    cardNo?: string; // 카드번호 - KB 카드소지확인 인증이 필요한 경우 (마스킹 없는 전체 카드번호 입력)
    cardPassword?: string; // 카드비밀번호 - KB 카드 소지확인 필요한 경우 (카드 비밀번호 앞 2자리)
    isAgreeForPrivacyPolicyTerm?: boolean; // '개인정보 활용 동의 여부'
    isAgreeForServiceUsageTerm?: boolean; // '서비스 이용약관 동의 여부'
}
