import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {TypeCast} from '^types/utils/class-transformer';
import {QueryUnitDto} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateParserDto';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export class CodefBillingHistoryDto {
    id: number;
    codefCardId: number;
    @TypeCast(() => CodefCardDto) codefCard?: CodefCardDto;

    billingHistoryId: number | null;
    fromApproval: boolean; // 승인내역 데이터 사용여부
    fromPurchase: boolean; // 매입내역 데이터 사용여부

    // 결제일시
    @TypeCast(() => Date) usedAt: Date;
    identifyKey: string; // 승인내역-매입내역 매칭키
    isForeign: boolean; // 해외결제여부
    finalPrice: number; // 최종결제금액
    resUsedDate: string; // '20240218';
    resUsedTime: string; // '103945';
    resCardNo: string; // '************9880';
    resCardNo1: string; // "";
    resCardName: string; // "";
    resMemberStoreName: string; // '자동결제';
    get memberStoreName() {
        return `${this.resMemberStoreName}`.trim().toLowerCase();
    }
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

    get paidAt() {
        const canceled = ['1', '2'].includes(this.resCancelYN);
        const failed = ['3'].includes(this.resCancelYN);
        if (canceled || failed) return undefined;
        return this.usedAt;
    }

    get memo() {
        const canceled = ['1', '2'].includes(this.resCancelYN);
        const failed = ['3'].includes(this.resCancelYN);
        if (canceled) return '결제 취소';
        if (failed) return '승인 거절';
        return '';
    }
}

export class FindAllCodefBillingHistoryQueryDto extends FindAllQueryDto<CodefBillingHistoryDto> {
    like?: QueryUnitDto;
}
