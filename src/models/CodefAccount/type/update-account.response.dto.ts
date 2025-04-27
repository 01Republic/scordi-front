import {TypeCast} from '^types/utils/class-transformer';
import {CodefCardCompanyCode, CodefCustomerType, CodefRequestBusinessType} from '^models/CodefAccount/type/enums';
import {CodefApiResultCode, CodefResponse} from '^models/CodefAccount/codef-common';

class CodefApiAccountUpdateResultItem {
    code: CodefApiResultCode;
    message: string;
    countryCode: string; // 국가코드 (한국 : KR)
    clientType: CodefCustomerType; // 고객 구분
    organization: CodefCardCompanyCode; // 기관코드
    businessType: CodefRequestBusinessType; // 업무 구분
}

class UpdateAccountResponseDataDto {
    connectedId: string;

    @TypeCast(() => CodefApiAccountUpdateResultItem)
    successList: CodefApiAccountUpdateResultItem[];

    @TypeCast(() => CodefApiAccountUpdateResultItem)
    errorList: CodefApiAccountUpdateResultItem[];
}

export class UpdateAccountResponseDto extends CodefResponse {
    @TypeCast(() => UpdateAccountResponseDataDto)
    data: UpdateAccountResponseDataDto;
}
