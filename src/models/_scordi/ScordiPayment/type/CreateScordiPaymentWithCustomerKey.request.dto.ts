import {CreateScordiPaymentMethodByCustomerKeyRequestDto} from '^models/_scordi/ScordiPaymentMethod/type';

/**
 * d-pay 결제요청 Request Body
 * ---
 *  - planId: number; // 구매할 플랜 ID
 *  - cardNumber: string; // 카드 번호: 특수문자를 포함하지 않는 문자열입니다. 최대 길이는 20자입니다.
 *  - cardExpirationYear: string; // 카드 유효 연도: 2-digit 문자열입니다. (2027 -> "27")
 *  - cardExpirationMonth: string; // 카드 유효 월: 2-digit 문자열입니다. (2월 -> "02")
 *  - cardPassword: string; // 카드 비밀번호 앞 두 자리
 *  - customerName: string; // 구매자명
 *  - customerEmail: string; // 구매자의 이메일 주소: 결제 상태가 바뀌면 이메일 주소로 결제내역이 전송됩니다. 최대 길이는 100자입니다.
 *  - customerPhone: string; // 고객 연락처
 *  - customerIdentityNumber: string; // 카드 소유자 정보 - 개인: 생년월일 6자리(YYMMDD) or 법인: 사업자등록번호 10자리
 */
export class CreateScordiPaymentWithCustomerKeyRequestDto extends CreateScordiPaymentMethodByCustomerKeyRequestDto {
    planId: number; // 구매할 플랜 ID
    customerPhone: string; // 고객 연락처
}
