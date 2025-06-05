import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {FindOperatorUnitDto} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

export class CodefBillingHistoryDto {
    id: number;
    codefCardId: number | null;
    codefBankAccountId: number | null;
    billingHistoryId: number | null;
    fromApproval: boolean; // 승인내역 데이터 사용여부
    fromPurchase: boolean; // 매입내역 데이터 사용여부

    @TypeCast(() => Date) usedAt: Date; // 결제일시
    identifyKey: string; // 승인내역-매입내역 매칭키

    isForeign: boolean; // 해외결제여부
    finalPrice: number; // 최종결제금액
    resUsedDate: string; // '20240218';
    resUsedTime: string; // '103945';

    resCardNo: string; // '************9880';
    resCardNo1: string; // "";
    resCardName: string; // "";
    resMemberStoreName: string; // '자동결제';
    memberStoreName: string;
    resUsedAmount: string; // '99000';
    resPaymentType: string; // '1';
    resInstallmentMonth: string; // 할부개월 | '';
    resAccountCurrency: string; // 'KRW';
    resApprovalNo: string; // '30001392';
    resPaymentDueDate: string; // '';
    resHomeForeignType: string; // '1';
    resMemberStoreType: string; // '전자상거래PG';
    resMemberStoreNo: string; // '41222801';
    resMemberStoreCorpNo: string; // '4118601799';
    resMemberStoreTelNo: string; // '0215447772';
    resMemberStoreAddr: string; // '서울 강남구 역삼1동 15층 (역삼동,한국지식재산센터)';
    resCancelYN: string; // '0';
    resCancelDate: string; // '';
    resCancelAmount: string; // '';
    resKRWAmt: string; // '';
    resFee: string; // '';
    resVAT: string; // "";
    resPurchaseYN: string; // '';
    resPurchaseDate: string; // '20240219';
    resUseNation: string; // '';
    resForeignReceiptAmt: string; // '';
    resAccountCurrency1: string; // '';
    resExchangeRate: string; // '';
    resCashBack: string; // "";

    /** ### 계좌 수시입출내역 관련 컬럼 */
    @TypeCast(() => Number) resAccountOut: number; // 출금금액
    @TypeCast(() => Number) resAccountIn: number; // 입금금액
    resAccountDesc1: string; // 거래내역 비고1 [보낸분/받는분]
    resAccountDesc2: string; // 거래내역 비고2 [거래구분/메모]
    resAccountDesc3: string; // 거래내역 비고3 [적요]
    resAccountDesc4: string; // 거래내역 비고4 [거래점]
    computedAccountDesc: string; // 파서를 위한 비고들이 합쳐진 컬럼

    @TypeCast(() => Number) resAfterTranBalance: number; // 거래후 잔액

    @TypeCast(() => Date) paidAt: Date | undefined;
    memo: string;

    isCanceled: boolean;
    isFailed: boolean;
    isSuccess: boolean;

    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    drainedCodefBillingHistoryId?: number;

    @TypeCast(() => CodefCardDto) codefCard?: CodefCardDto;
    @TypeCast(() => CodefBankAccountDto) codefBankAccount?: CodefBankAccountDto;
}

export class FindAllCodefBillingHistoryQueryDto extends FindAllQueryDto<CodefBillingHistoryDto> {
    find?: FindOperatorUnitDto;
}

export class FindAllCodefBillingHistoryAdminQueryDto extends FindAllQueryDto<CodefBillingHistoryDto> {
    organizationId?: number;
}
