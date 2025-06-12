import {TypeCast} from '^types/utils/class-transformer';
import {CodefAccountDto} from './CodefAccountDto';
import {CodefApiAccountItemDto} from './CodefApiAccountItemDto';
import {CodefApiResponseResultDto} from '^models/CodefAccount/codef-common';

export class AccountCreatedResponseDto {
    connectedId?: string;

    @TypeCast(() => CodefAccountDto)
    accessList: CodefAccountDto[];

    @TypeCast(() => CodefApiAccountItemDto)
    errorList?: CodefApiAccountItemDto[];
}

/**
 * CodefAccount Create 요청에 대한 에러 응답 객체
 * - Axios 에러인 경우, `ApiErrorResponse<CodefAccountCreateErrorResponseDto>` 로 타이핑하여 사용
 */
export class CodefAccountCreateErrorResponseDto {
    data: {
        successList: any[];
        errorList: CodefApiAccountItemDto[];
    };
    result: CodefApiResponseResultDto;
}
