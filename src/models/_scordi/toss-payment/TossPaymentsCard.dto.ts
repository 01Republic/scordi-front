enum TossPaymentsCardType {
    CREDIT = '신용',
    CHECK = '체크',
    GIFT = '기프트',
}

enum TossPaymentsCardOwnerType {
    PERSONAL = '개인',
    COMPANY = '법인',
}

// 발급된 빌링키와 연결된 카드 정보입니다.
export class TossPaymentsCardDto {
    issuerCode: string; // 카드 발급사 두 자리 코드입니다. [카드사 코드]를 참고하세요.
    acquirerCode: string; // 카드 매입사 두 자리 코드입니다. [카드사 코드]를 참고하세요.
    number: string; // 카드 번호입니다. 번호의 일부는 마스킹 되어 있습니다. 최대 길이는 20자입니다.
    cardType: TossPaymentsCardType; // 카드 종류입니다. 신용, 체크, 기프트 중 하나입니다.
    ownerType: TossPaymentsCardOwnerType; // 카드의 소유자 타입입니다. 개인, 법인 중 하나입니다.
}
