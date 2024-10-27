import {TypeCast} from '^types/utils/class-transformer';

export class TossPaymentsCashReceiptDto {
    // 현금영수증의 키 값입니다. 최대 길이는 200자입니다.
    receiptKey: string;

    // 주문번호입니다. 최소 길이는 6자, 최대 길이는 64자입니다. 주문한 결제를 식별하는 역할로, 결제를 요청할 때 가맹점에서 만들어서 사용합니다. 결제 데이터 관리를 위해 반드시 저장해야 합니다. 중복되지 않는 고유한 값을 발급해야 합니다. 결제 상태가 변해도 값이 유지됩니다.
    orderId: string;

    // 구매상품입니다. 예를 들면 생수 외 1건 같은 형식입니다. 최대 길이는 100자입니다.
    orderName: string;

    // 현금영수증의 종류입니다. 소득공제, 지출증빙 중 하나입니다.
    type: string;

    // (2022-07-27) 현금영수증 발급 번호입니다. 최대 길이는 9자입니다.
    issueNumber: string;

    // 발행된 현금영수증을 확인할 수 있는 주소입니다.
    receiptUrl: string;

    // (2022-07-27) 현금영수증을 발급한 사업자등록번호입니다. 길이는 10자입니다.
    businessNumber: string;

    // (2022-07-27) 현금영수증 발급 종류입니다. 현금영수증 발급(CONFIRM)·취소(CANCEL) 건을 구분합니다.
    transactionType: string;

    // (2022-07-27) 현금영수증 처리된 금액입니다.
    amount: number;

    // (2022-07-27) 면세 처리된 금액입니다.
    taxFreeAmount: number;

    // (2022-07-27) 현금영수증 발급 상태입니다. 발급 승인 여부는 요청 후 1-2일 뒤 조회할 수 있습니다. IN_PROGRESS, COMPLETED, FAILED 중 하나입니다. 각 상태의 자세한 설명은 CashReceipt 객체에서 확인할 수 있습니다.
    issueStatus: string;

    // (2022-07-27) 결제 실패 객체입니다. 오류 타입을 보여주는 code와 에러 메시지를 보여주는 message 필드가 있습니다.
    failure?: {code: string; message: string};

    // (2022-07-27) 현금영수증 발급에 필요한 소비자 인증수단입니다. 현금영수증을 발급한 주체를 식별합니다. 최대 길이는 30자입니다. 현금영수증 종류에 따라 휴대폰 번호, 사업자등록번호, 현금영수증 카드 번호 등을 입력할 수 있습니다.
    customerIdentityNumber: string;

    // (2022-07-27) 현금영수증 발급 혹은 취소를 요청한 날짜와 시간 정보입니다. ISO 8601 형식입니다.
    @TypeCast(() => Date) requestedAt: Date;
}

export class TossPaymentsCashReceiptSimpleDto {
    // 현금영수증의 종류입니다. 소득공제, 지출증빙 중 하나입니다.
    type: string;

    // 현금영수증의 키 값입니다. 최대 길이는 200자입니다.
    receiptKey: string;

    // (2022-07-27) 현금영수증 발급 번호입니다. 최대 길이는 9자입니다.
    issueNumber: string;

    // 발행된 현금영수증을 확인할 수 있는 주소입니다.
    receiptUrl: string;

    // (2022-07-27) 현금영수증 처리된 금액입니다.
    amount: number;

    // (2022-07-27) 면세 처리된 금액입니다.
    taxFreeAmount: number;
}
