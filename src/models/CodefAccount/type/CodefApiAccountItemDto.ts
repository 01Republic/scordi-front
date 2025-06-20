import {CodefCustomerType, CodefLoginType, CodefRequestBusinessType} from '^models/CodefAccount/type/enums';
import {CodefCompanyCode} from '^models/CodefAccount/type/CodefCompanyStaticData';
import {CodefApiResultCode} from '^models/CodefAccount/codef-common';

export class CodefApiAccountItemDto {
    code: CodefApiResultCode;
    message: string;
    extraMessage: string;
    countryCode: string; // 국가코드 (한국 : KR)
    clientType: CodefCustomerType; // 고객 구분
    organization: CodefCompanyCode; // 기관코드
    businessType: CodefRequestBusinessType; // 업무 구분
    loginType: CodefLoginType; // 로그인 방식
}
