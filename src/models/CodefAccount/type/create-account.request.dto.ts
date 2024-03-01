import {
    CodefCardCompanyCode,
    CodefClientTypeLevel,
    CodefCustomerType,
    CodefLoginType,
    CodefLoginTypeLevel,
    CodefRequestBusinessType,
} from './enums';
import {cipherTextOn} from '^components/util/cipher-text';
import {networkSignKey} from '^config/environments';

export class CreateAccountRequestDto {
    businessType: CodefRequestBusinessType; // 업무 구분 (은행/카드)
    organization: CodefCardCompanyCode; // 기관코드
    clientType: CodefCustomerType; // 고객구분(개인 / 법인)
    loginType: CodefLoginType; // 로그인 방식 (인증서/아이디)
    id: string; // 아이디
    password: string; // 비밀번호
    loginTypeLevel?: CodefLoginTypeLevel; // 로그인구분 - 신한/롯데 법인카드의 경우
    clientTypeLevel?: CodefClientTypeLevel; // 의뢰인구분 - 신한 법인카드의 경우
    cardNo?: string; // 카드번호 - KB 카드소지확인 인증이 필요한 경우 (마스킹 없는 전체 카드번호 입력)
    cardPassword?: string; // 카드비밀번호 - KB 카드 소지확인 필요한 경우 (카드 비밀번호 앞 2자리)
}

export function encryptCodefAccountPassword(text: string, salt: string): string {
    const secret = networkSignKey + salt;
    const cipherText = cipherTextOn(secret);
    return cipherText.encrypt(text);
}
