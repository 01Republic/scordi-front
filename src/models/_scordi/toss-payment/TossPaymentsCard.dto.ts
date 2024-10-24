import {cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefCardCompanyCode} from '^models/CodefAccount/type/enums';

const CardCompanies = cardAccountsStaticData;

enum TossPaymentsCardType {
    CREDIT = '신용',
    CHECK = '체크',
    GIFT = '기프트',
}

enum TossPaymentsCardOwnerType {
    PERSONAL = '개인',
    COMPANY = '법인',
}

/**
 * 발급된 빌링키와 연결된 카드 정보입니다.
 * - "카드 발급사" & "카드 매입사" : 카드 종류는 크게 신용카드, 체크카드, 선불카드 등으로 구분돼요.
 */
export class TossPaymentsCardDto {
    issuerCode: string; // "카드 발급사" 두 자리 코드입니다. [카드사 코드](https://docs.tosspayments.com/codes/org-codes#%EC%B9%B4%EB%93%9C%EC%82%AC-%EC%BD%94%EB%93%9C)를 참고하세요.
    acquirerCode: string; // "카드 매입사" 두 자리 코드입니다. [카드사 코드](https://docs.tosspayments.com/codes/org-codes#%EC%B9%B4%EB%93%9C%EC%82%AC-%EC%BD%94%EB%93%9C)를 참고하세요.
    number: string; // 카드 번호입니다. 번호의 일부는 마스킹 되어 있습니다. 최대 길이는 20자입니다.
    cardType: TossPaymentsCardType; // 카드 종류입니다. 신용, 체크, 기프트 중 하나입니다.
    ownerType: TossPaymentsCardOwnerType; // 카드의 소유자 타입입니다. 개인, 법인 중 하나입니다.

    asCardCompany(cardCompanyCode: string) {
        const dic: Record<string, CodefCardCompanyCode> = {
            '41': CodefCardCompanyCode.신한카드,
            '71': CodefCardCompanyCode.롯데카드,
            '11': CodefCardCompanyCode.KB국민카드,
            '31': CodefCardCompanyCode.BC카드,
            '3K': CodefCardCompanyCode.BC카드,
            '21': CodefCardCompanyCode.하나카드,
            '51': CodefCardCompanyCode.삼성카드,
            '33': CodefCardCompanyCode.우리카드,
            W1: CodefCardCompanyCode.우리카드,
            '61': CodefCardCompanyCode.현대카드,
            '91': CodefCardCompanyCode.NH카드,
        };

        const param = dic[cardCompanyCode.toUpperCase()];
        if (param) {
            return CardCompanies.find((c) => c.param === param);
        }
    }
}
