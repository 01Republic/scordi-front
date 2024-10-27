import {TypeCast} from '^types/utils/class-transformer';
import {TossPaymentsCancelDto} from './TossPaymentsCancel.dto';
import {TossPaymentsCashReceiptDto, TossPaymentsCashReceiptSimpleDto} from './TossPaymentsCashReceipt.dto';
import {Currency, CurrencyDto} from '^types/crawler';
import {CurrencyCode, CurrencyList, CurrencyListV2} from '^models/Money';
import {getCardCompanyByCompanyCode} from '^models/_scordi/toss-payment/TossPaymentsCard.dto';

/**
 * {
 *     "mId": "bill_jerowtuly",
 *     "lastTransactionKey": "9571046BCBEA76743B01477A2F684E75",
 *     "paymentKey": "bill_20241024192259xEdN5",
 *     "orderId": "2",
 *     "orderName": "서포터",
 *     "taxExemptionAmount": 0,
 *     "status": "DONE",
 *     "requestedAt": "2024-10-24T19:22:59+09:00",
 *     "approvedAt": "2024-10-24T19:22:59+09:00",
 *     "useEscrow": false,
 *     "cultureExpense": false,
 *     "card": {
 *         "issuerCode": "15",
 *         "acquirerCode": "11",
 *         "number": "53651015****136*",
 *         "installmentPlanMonths": 0,
 *         "isInterestFree": false,
 *         "interestPayer": null,
 *         "approveNo": "21264402",
 *         "useCardPoint": false,
 *         "cardType": "체크",
 *         "ownerType": "개인",
 *         "acquireStatus": "READY",
 *         "amount": 10000
 *     },
 *     "virtualAccount": null,
 *     "transfer": null,
 *     "mobilePhone": null,
 *     "giftCertificate": null,
 *     "cashReceipt": null,
 *     "cashReceipts": null,
 *     "discount": null,
 *     "cancels": null,
 *     "secret": "ps_yL0qZ4G1VOLQMoAlJv4nroWb2MQY",
 *     "type": "BILLING",
 *     "easyPay": null,
 *     "country": "KR",
 *     "failure": null,
 *     "isPartialCancelable": true,
 *     "receipt": {
 *         "url": "https://dashboard.tosspayments.com/receipt/redirection?transactionId=bill_20241024192259xEdN5&ref=PX"
 *     },
 *     "checkout": {
 *         "url": "https://api.tosspayments.com/v1/payments/bill_20241024192259xEdN5/checkout"
 *     },
 *     "currency": "KRW",
 *     "totalAmount": 10000,
 *     "balanceAmount": 10000,
 *     "suppliedAmount": 9091,
 *     "vat": 909,
 *     "taxFreeAmount": 0,
 *     "method": "카드",
 *     "version": "2022-11-16",
 *     "metadata": null
 * }
 */

// (v1.2) 결제 타입 정보입니다. NORMAL(일반결제), BILLING(자동결제), BRANDPAY(브랜드페이) 중 하나입니다.
enum TossPaymentsPaymentResultType {
    NORMAL = 'NORMAL', // 일반결제
    BILLING = 'BILLING', // 자동결제
    BRANDPAY = 'BRANDPAY', // 브랜드페이
}

// 결제수단입니다. 카드, 가상계좌, 간편결제, 휴대폰, 계좌이체, 문화상품권, 도서문화상품권, 게임문화상품권 중 하나입니다.
enum TossPaymentsPaymentResultMethod {
    카드 = '카드',
    가상계좌 = '가상계좌',
    간편결제 = '간편결제',
    휴대폰 = '휴대폰',
    계좌이체 = '계좌이체',
    문화상품권 = '문화상품권',
    도서문화상품권 = '도서문화상품권',
    게임문화상품권 = '게임문화상품권',
}

/**
 * 결제 처리 상태입니다. 아래와 같은 상태 값을 가질 수 있습니다. 상태 변화 흐름이 궁금하다면 흐름도를 살펴보세요.
 * - READY: 결제를 생성하면 가지게 되는 초기 상태입니다. 인증 전까지는 READY 상태를 유지합니다.
 * - IN_PROGRESS: 결제수단 정보와 해당 결제수단의 소유자가 맞는지 인증을 마친 상태입니다. 결제 승인 API를 호출하면 결제가 완료됩니다.
 * - WAITING_FOR_DEPOSIT: 가상계좌 결제 흐름에만 있는 상태로, 결제 고객이 발급된 가상계좌에 입금하는 것을 기다리고 있는 상태입니다.
 * - DONE: 인증된 결제수단 정보, 고객 정보로 요청한 결제가 승인된 상태입니다.
 * - CANCELED: 승인된 결제가 취소된 상태입니다.
 * - PARTIAL_CANCELED: 승인된 결제가 부분 취소된 상태입니다.
 * - ABORTED: 결제 승인이 실패한 상태입니다.
 * - EXPIRED: 결제 유효 시간 30분이 지나 거래가 취소된 상태입니다. IN_PROGRESS 상태에서 결제 승인 API를 호출하지 않으면 EXPIRED가 됩니다.
 */
enum TossPaymentsPaymentResultStatus {
    READY = 'READY',
    IN_PROGRESS = 'IN_PROGRESS',
    WAITING_FOR_DEPOSIT = 'WAITING_FOR_DEPOSIT',
    DONE = 'DONE',
    CANCELED = 'CANCELED',
    PARTIAL_CANCELED = 'PARTIAL_CANCELED',
    ABORTED = 'ABORTED',
    EXPIRED = 'EXPIRED',
}

type TossPaymentsSettlementStatus = 'INCOMPLETED' | 'COMPLETED';

export class TossPaymentsPaymentDto {
    // (v1.2) Payment 객체의 응답 버전입니다. 버전 2022-06-08부터 날짜 기반 버저닝을 사용합니다.
    version: string;

    // 결제의 키 값입니다. 최대 길이는 200자입니다. 결제를 식별하는 역할로, 중복되지 않는 고유한 값입니다. 결제 데이터 관리를 위해 반드시 저장해야 합니다. 결제 상태가 변해도 값이 유지됩니다. 결제 승인, 결제 조회, 결제 취소 API에 사용합니다.
    paymentKey: string;

    // (v1.2) 결제 타입 정보입니다. NORMAL(일반결제), BILLING(자동결제), BRANDPAY(브랜드페이) 중 하나입니다.
    type: TossPaymentsPaymentResultType;

    // 주문번호입니다. 최소 길이는 6자, 최대 길이는 64자입니다. 주문한 결제를 식별하는 역할로, 결제를 요청할 때 가맹점에서 만들어서 사용한 값입니다. 결제 데이터 관리를 위해 반드시 저장해야 합니다. 중복되지 않는 고유한 값을 발급해야 합니다. 결제 상태가 변해도 값이 유지됩니다.
    orderId: string;

    // (v1.3) 구매상품입니다. 예를 들면 생수 외 1건 같은 형식입니다. 최대 길이는 100자입니다.
    orderName: string;

    // 상점아이디(MID)입니다. 토스페이먼츠에서 발급합니다. 최대 길이는 14자입니다.
    mId: string;

    // 결제할 때 사용한 통화입니다.
    currency: CurrencyCode;

    get currencyInfo() {
        return CurrencyListV2[this.currency];
    }

    // 결제수단입니다. 카드, 가상계좌, 간편결제, 휴대폰, 계좌이체, 문화상품권, 도서문화상품권, 게임문화상품권 중 하나입니다.
    method: TossPaymentsPaymentResultMethod | null;

    // 총 결제 금액입니다. 결제가 취소되는 등 결제 상태가 변해도 최초에 결제된 결제 금액으로 유지됩니다.
    totalAmount: number;

    // 취소할 수 있는 금액(잔고)입니다. 이 값은 결제 취소나 부분 취소가 되고 나서 남은 값입니다. 결제 상태 변화에 따라 vat, suppliedAmount, taxFreeAmount, taxExemptionAmount와 함께 값이 변합니다.
    balanceAmount: number;

    // 결제 처리 상태입니다. 아래와 같은 상태 값을 가질 수 있습니다. 상태 변화 흐름이 궁금하다면 흐름도를 살펴보세요.
    status: TossPaymentsPaymentResultStatus;

    // 결제가 일어난 날짜와 시간 정보입니다. ISO 8601 형식입니다.
    @TypeCast(() => Date) requestedAt: Date;

    // 결제 승인이 일어난 날짜와 시간 정보입니다. ISO 8601 형식입니다.
    @TypeCast(() => Date) approvedAt: Date | null;

    // 에스크로 사용 여부입니다.
    useEscrow: boolean;

    // 마지막 거래의 키 값입니다. 한 결제 건의 승인 거래와 취소 거래를 구분하는 데 사용됩니다. 예를 들어 결제 승인 후 부분 취소를 두 번 했다면 마지막 부분 취소 거래의 키 값이 할당됩니다. 최대 길이는 64자입니다.
    lastTransactionKey: string | null;

    // (v1.3) 공급가액입니다. 결제 취소 및 부분 취소가 되면 공급가액도 일부 취소되어 값이 바뀝니다.
    suppliedAmount: number;

    // (v1.3) 부가세입니다. 결제 취소 및 부분 취소가 되면 부가세도 일부 취소되어 값이 바뀝니다. (결제 금액 amount - 면세 금액 [taxFreeAmount](https://docs.tosspayments.com/reference#paymentdetaildto-taxfreeamount)) / 11 후 소수점 첫째 자리에서 반올림해서 계산합니다.
    // (e.g. 결제 금액이 10,000원이고, 면세 금액이 3,000원이라면 부가세는 (10000-3000)/11 = 636.3636..을 반올림한 값 636원입니다.)
    // 더 자세한 내용은 [세금 처리하기](https://docs.tosspayments.com/guides/learn/tax)에서 살펴보세요.
    vat: number;

    // (v1.3) 문화비(도서, 공연 티켓, 박물관·미술관 입장권 등) 지출 여부입니다. 계좌이체, 가상계좌 결제에만 적용됩니다.
    // * 카드 결제는 항상 false로 돌아옵니다. 카드 결제 문화비는 카드사에 문화비 소득공제 전용 가맹점번호로 등록하면 자동으로 처리됩니다.
    cultureExpense: boolean;

    // (v1.3) 결제 금액 중 면세 금액입니다. 결제 취소 및 부분 취소가 되면 면세 금액도 일부 취소되어 값이 바뀝니다.
    // * 일반 상점일 때는 면세 금액으로 0이 돌아옵니다. 면세 상점, 복합 과세 상점일 때만 면세 금액이 돌아옵니다. 더 자세한 내용은 세금 처리하기에서 살펴보세요.
    taxFreeAmount: number;

    // 과세를 제외한 결제 금액(컵 보증금 등)입니다. 이 값은 결제 취소 및 부분 취소가 되면 과세 제외 금액도 일부 취소되어 값이 바뀝니다.
    // * 과세 제외 금액이 있는 카드 결제는 부분 취소가 안 됩니다.
    taxExemptionAmount: number;

    // 결제 취소 이력입니다.
    @TypeCast(() => TossPaymentsCancelDto) cancels: TossPaymentsCancelDto[] | null;

    // 부분 취소 가능 여부입니다. 이 값이 false이면 전액 취소만 가능합니다.
    isPartialCancelable: boolean;

    get cardIssuerCompany() {
        if (!this.card) return;
        return getCardCompanyByCompanyCode(this.card.issuerCode);
    }

    get cardAcquirerCompany() {
        if (!this.card?.acquirerCode) return;
        return getCardCompanyByCompanyCode(this.card.acquirerCode);
    }

    cardNumbers() {
        const cardNumber = this.card?.number || '';
        if (!cardNumber) return [];

        const n1 = cardNumber.slice(0, 4);
        const n2 = cardNumber.slice(4, 8);
        const n3 = cardNumber.slice(8, 12);
        const n4 = cardNumber.slice(-4);
        return [n1, n2, n3, n4];
    }

    get fullCardNumber() {
        return this.cardNumbers().join('-');
    }

    get cardOwnerType() {
        return this.card?.ownerType;
    }

    get cardType() {
        return this.card?.cardType;
    }

    // 카드로 결제하면 제공되는 카드 관련 정보입니다.
    card: null | {
        // 카드사에 결제 요청한 금액입니다. 즉시 할인 금액(discount.amount)이 포함됩니다.
        // * 간편결제에 등록된 카드로 결제했다면 간편결제 응답 확인 가이드를 참고하세요.
        amount: number;

        // 카드 발급사 두 자리 코드입니다. 카드사 코드를 참고하세요.
        issuerCode: string;

        // 카드 매입사 두 자리 코드입니다. 카드사 코드를 참고하세요.
        acquirerCode: string | null;

        // 카드번호입니다. 번호의 일부는 마스킹 되어 있습니다. 최대 길이는 20자입니다.
        number: string;

        // 할부 개월 수입니다. 일시불이면 0입니다.
        installmentPlanMonths: number;

        // 카드사 승인 번호입니다. 최대 길이는 8자입니다.
        approveNo: string;

        // 카드사 포인트 사용 여부입니다.
        // * 일반 카드사 포인트가 아닌, 특수한 포인트나 바우처를 사용하면 할부 개월 수가 변경되어 응답이 돌아오니 유의해주세요.
        useCardPoint: boolean;

        // 카드 종류입니다. 신용, 체크, 기프트, 미확인 중 하나입니다. 고객이 해외 카드로 결제했거나 간편결제의 결제 수단을 조합해서 결제했을 때 미확인으로 표시됩니다.
        cardType: string;

        // 카드의 소유자 타입입니다. 개인, 법인, 미확인 중 하나입니다. 고객이 해외 카드로 결제했거나 간편결제의 결제 수단을 조합해서 결제했을 때 미확인으로 표시됩니다.
        ownerType: string;

        // 카드 결제의 매입 상태입니다. 아래와 같은 상태 값을 가질 수 있습니다.
        // - READY: 아직 매입 요청이 안 된 상태입니다.
        // - REQUESTED: 매입이 요청된 상태입니다.
        // - COMPLETED: 요청된 매입이 완료된 상태입니다.
        // - CANCEL_REQUESTED: 매입 취소가 요청된 상태입니다.
        // - CANCELED: 요청된 매입 취소가 완료된 상태입니다.
        acquireStatus: string;

        // 무이자 할부의 적용 여부입니다.
        isInterestFree: boolean;

        // (v1.4) 할부가 적용된 결제에서 할부 수수료를 부담하는 주체입니다. BUYER, CARD_COMPANY, MERCHANT 중 하나입니다.
        // - BUYER: 상품을 구매한 고객이 할부 수수료를 부담합니다. 일반적인 할부 결제입니다.
        // - CARD_COMPANY: 카드사에서 할부 수수료를 부담합니다. 무이자 할부 결제입니다.
        // - MERCHANT: 상점에서 할부 수수료를 부담합니다. 무이자 할부 결제입니다.
        interestPayer: string | null;
    };

    // 가상계좌로 결제하면 제공되는 가상계좌 관련 정보입니다.
    virtualAccount: null | {
        // 가상계좌 타입을 나타냅니다. 일반, 고정 중 하나입니다.
        accountType: string;

        // 발급된 계좌번호입니다. 최대 길이는 20자입니다.
        accountNumber: string;

        // 가상계좌 은행 두 자리 코드입니다. 은행 코드와 증권사 코드를 참고하세요.
        bankCode: string;

        // 가상계좌를 발급한 구매자명입니다. 최대 길이는 100자입니다.
        customerName: string;

        // 입금 기한입니다. ISO 8601 형식을 사용합니다.
        dueDate: string;

        // 환불 처리 상태입니다. 아래와 같은 상태 값을 가질 수 있습니다.
        // - NONE: 환불 요청이 없는 상태입니다.
        // - PENDING: 환불을 처리 중인 상태입니다.
        // - FAILED: 환불에 실패한 상태입니다.
        // - PARTIAL_FAILED: 부분 환불에 실패한 상태입니다.
        // - COMPLETED: 환불이 완료된 상태입니다.
        refundStatus: string;

        // 가상계좌의 만료 여부입니다.
        expired: boolean;

        // 정산 상태입니다. 정산이 아직 되지 않았다면 INCOMPLETED, 정산이 완료됐다면 COMPLETED 값이 들어옵니다.
        settlementStatus: TossPaymentsSettlementStatus;

        // 결제위젯 가상계좌 환불 정보 입력 기능으로 받은 고객의 환불 계좌 정보입니다. 은행 코드(bankCode), 계좌번호(accountNumber), 예금주 정보(holderName)가 담긴 객체입니다.
        // * 구매자의 환불계좌 정보는 결제창을 띄운 시점부터 30분 동안만 조회할 수 있습니다. 이후에는 값이 내려가지 않습니다. 더 자세한 내용은 결제 취소 가이드를 참고하세요.
        refundReceiveAccount: null | {
            bankCode: string;
            accountNumber: string;
            holderName: string;
        };
    };

    // 웹훅을 검증하는 최대 50자 값입니다. 가상계좌 웹훅 이벤트 본문으로 돌아온 secret과 같으면 정상적인 웹훅입니다. 결제 상태 웹훅 이벤트로 돌아오는 Payment 객체의 secret과 같으면 정상적인 웹훅입니다.
    secret: string | null;

    // 휴대폰으로 결제하면 제공되는 휴대폰 결제 관련 정보입니다.
    mobilePhone: null | {
        // 구매자가 결제에 사용한 휴대폰 번호입니다. - 없이 숫자로만 구성된 최소 8자, 최대 15자의 문자열입니다.
        customerMobilePhone: string;

        // 정산 상태입니다. 정산이 아직 되지 않았다면 INCOMPLETED, 정산이 완료됐다면 COMPLETED 값이 들어옵니다.
        settlementStatus: TossPaymentsSettlementStatus;

        // (v1.4) 휴대폰 결제 내역 영수증을 확인할 수 있는 주소입니다.
        receiptUrl: string;
    };

    // 상품권으로 결제하면 제공되는 상품권 결제 관련 정보입니다.
    giftCertificate: null | {
        // 결제 승인번호입니다. 최대 길이는 8자입니다.
        approveNo: string;

        // 정산 상태입니다. 정산이 아직 되지 않았다면 INCOMPLETED, 정산이 완료됐다면 COMPLETED 값이 들어옵니다.
        settlementStatus: TossPaymentsSettlementStatus;
    };

    // (v1.1) 계좌이체로 결제했을 때 이체 정보가 담기는 객체입니다.
    transfer: null | {
        // 은행 두 자리 코드입니다. 은행 코드와 증권사 코드를 참고하세요.
        bankCode: string;

        // 정산 상태입니다. 정산이 아직 되지 않았다면 INCOMPLETED, 정산이 완료됐다면 COMPLETED 값이 들어옵니다.
        settlementStatus: TossPaymentsSettlementStatus;
    };

    // 결제 요청 시 직접 추가할 수 있는 결제 관련 정보입니다. 최대 5개의 키-값(key-value) 쌍입니다. 키는 [ , ] 를 사용하지 않는 최대 40자의 문자열, 값은 최대 500자의 문자열입니다.
    metadata: any;

    // 발행된 영수증 정보입니다.
    receipt: null | {
        // 고객에게 제공할 수 있는 결제수단별 영수증입니다. 카드 결제는 매출전표, 가상계좌는 무통장 거래 명세서, 계좌이체・휴대폰・상품권 결제는 결제 거래 내역 확인서가 제공됩니다.
        url: string;
    };

    // 결제창 정보입니다.
    checkout: null | {
        // 결제창이 열리는 주소입니다.
        url: string;
    };

    // (v1.2) [간편결제](https://docs.tosspayments.com/resources/glossary/easypay) 정보입니다.
    // 고객이 선택한 결제수단에 따라 amount, discountAmount가 달라집니다. [간편결제 응답 확인 가이드](https://docs.tosspayments.com/guides/learn/easypay-response)를 참고하세요.
    easyPay: null | {
        // 선택한 [간편결제사 코드](https://docs.tosspayments.com/codes/org-codes#%EA%B0%84%ED%8E%B8%EA%B2%B0%EC%A0%9C%EC%82%AC-%EC%BD%94%EB%93%9C)입니다.
        provider: string;

        // 간편결제 서비스에 등록된 계좌 혹은 현금성 포인트로 결제한 금액입니다.
        amount: number;

        // 간편결제 서비스의 적립 포인트나 쿠폰 등으로 즉시 할인된 금액입니다.
        discountAmount: number;
    };

    // (v1.4) 결제한 국가입니다. [ISO-3166의 두 자리 국가 코드](https://ko.wikipedia.org/wiki/ISO_3166-1_alpha-2) 형식입니다.
    country: string;

    // (v1.4) 결제 승인에 실패하면 응답으로 받는 에러 객체입니다. 실패한 결제를 조회할 때 확인할 수 있습니다.
    failure: null | {
        // 오류 타입을 보여주는 에러 코드입니다.
        code: string;

        // 에러 메시지입니다. 에러 발생 이유를 알려줍니다. 최대 길이는 510자입니다.
        message: string;
    };

    // [현금영수증](https://docs.tosspayments.com/resources/glossary/cash-receipt) 정보입니다.
    @TypeCast(() => TossPaymentsCashReceiptSimpleDto) cashReceipt: null | TossPaymentsCashReceiptSimpleDto;

    // 현금영수증 발행 및 취소 이력이 담기는 배열입니다. 순서는 보장되지 않습니다. 예를 들어 결제 후 부분 취소가 여러 번 일어나면 모든 결제 및 부분 취소 건에 대한 현금영수증 정보를 담고 있습니다.
    // 계좌이체는 결제 즉시 현금영수증 정보를 확인할 수 있습니다. 가상계좌는 고객이 입금을 완료하면 현금영수증 정보를 확인할 수 있습니다.
    // * 결제가 이미 승인된 후 현금영수증 발급 요청 API로 발급한 현금영수증은 먼저 처리된 결제 정보와 연결되지 않아 값이 null입니다. 현금영수증 조회 API로 조회해주세요.
    // * 현금영수증 가맹점이라면 결제했을 때 바로 발급됩니다. 발급을 원하지 않는다면 토스페이먼츠 고객센터(1544-7772, support@tosspayments.com)로 문의해주세요.
    @TypeCast(() => TossPaymentsCashReceiptSimpleDto) cashReceipts: null | TossPaymentsCashReceiptDto[];

    // 카드사 및 퀵계좌이체의 즉시 할인 프로모션 정보입니다. 즉시 할인 프로모션이 적용됐을 때만 생성됩니다.
    discount: null | {
        // 카드사 및 퀵계좌이체의 즉시 할인 프로모션을 적용한 결제 금액입니다.
        amount: number;
    };
}
