import {OmitType} from '^types/utils/omit-type';

export class UpsertVendorContractRequestDto {
    subscriptionId: number; // 연결하고자 하는 구독 ID
    vendorCompanyId?: number; // 연결하고자 하는 벤더사 ID
    vendorManagerId?: number; // 연결하고자 하는 벤더사 담당자 ID
    memo?: string; // 비고
}

export class UpsertVendorContractWithSubscriptionDto extends OmitType(UpsertVendorContractRequestDto, [
    'subscriptionId',
]) {
    //
}
