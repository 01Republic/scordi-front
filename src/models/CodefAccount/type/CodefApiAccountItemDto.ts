import {
    CodefCardCompanyCode,
    CodefCustomerType,
    CodefLoginType,
    CodefRequestBusinessType,
} from '^models/CodefAccount/type/enums';

export enum CodefApiResultCode {
    SUCCESS = 'CF-00000',
}

export class CodefApiAccountItemDto {
    code: CodefApiResultCode;
    message: string;
    extraMessage: string;
    countryCode: string; // 국가코드 (한국 : KR)
    clientType: CodefCustomerType; // 고객 구분
    organization: CodefCardCompanyCode; // 기관코드
    businessType: CodefRequestBusinessType; // 업무 구분
    loginType: CodefLoginType; // 로그인 방식
}
