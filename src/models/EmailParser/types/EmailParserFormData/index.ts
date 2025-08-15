import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {BasePropertyFormData} from './base.property.form-data';
import {MoneyPropertyFormData} from './money.property.form-data';
import {TextPropertyFormData} from './text.property.form-data';
import {DatePropertyFormData} from './date.property.form-data';
import {NumberPropertyFormData} from './number.property.form-data';
import {BooleanPropertyFormData} from './boolean.property.form-data';
import {EnumPropertyFormData} from './enum.property.form-data';
import {ClassConstructor} from 'class-transformer';

export * from './selected-property.enum';
export * from './base.property.form-data';
export * from './money.property.form-data';
export * from './text.property.form-data';
export * from './date.property.form-data';
export * from './number.property.form-data';
export * from './boolean.property.form-data';
export * from './enum.property.form-data';

// EmailParser 를 만드는 form 데이터의 자료 구조
export class EmailParserFormData {
    payAmountParser?: MoneyPropertyFormData; // 국내 결제금액
    abroadPayAmountParser?: MoneyPropertyFormData; // 해외 결제금액
    vatAmountParser?: MoneyPropertyFormData; // 부가세
    payMethodParser?: TextPropertyFormData; // 결제수단(카드번호)
    invoiceUrlParser?: TextPropertyFormData; // 청구서 파일 주소
    issuedAtParser?: DatePropertyFormData; // 청구일시
    isPaidParser?: BooleanPropertyFormData; // 결제완료여부
    paidAtParser?: DatePropertyFormData; // 결제완료일시
    workspaceNameParser?: TextPropertyFormData; // 워크스페이스명
    planNameParser?: TextPropertyFormData; // 플랜명
    billingCycleParser?: EnumPropertyFormData<BillingCycleOptions>; // 결제주기
    nextBillingDateParser?: DatePropertyFormData; // 다음결제예정일
    paidMemberCountParser?: NumberPropertyFormData; // 결제 계정수(시트수)
}

export const ParserTypes = {
    payAmountParser: {title: '국내 결제금액', FormData: MoneyPropertyFormData},
    abroadPayAmountParser: {title: '해외 결제금액', FormData: MoneyPropertyFormData},
    vatAmountParser: {title: '부가세', FormData: MoneyPropertyFormData},
    payMethodParser: {title: '결제수단(카드번호)', FormData: TextPropertyFormData},
    invoiceUrlParser: {title: '청구서 파일 주소', FormData: TextPropertyFormData},
    issuedAtParser: {title: '청구일시', FormData: DatePropertyFormData},
    isPaidParser: {title: '결제완료여부', FormData: BooleanPropertyFormData},
    paidAtParser: {title: '결제완료일시', FormData: DatePropertyFormData},
    workspaceNameParser: {title: '워크스페이스명', FormData: TextPropertyFormData},
    planNameParser: {title: '플랜명', FormData: TextPropertyFormData},
    billingCycleParser: {title: '결제주기', FormData: EnumPropertyFormData},
    nextBillingDateParser: {title: '다음결제예정일', FormData: DatePropertyFormData},
    paidMemberCountParser: {title: '결제 계정수(시트수)', FormData: NumberPropertyFormData},
} as Record<keyof EmailParserFormData, {title: string; FormData: ClassConstructor<BasePropertyFormData>}>;
