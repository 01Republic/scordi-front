import {CodefApiResultCode} from '^models/CodefAccount/type/CodefApiAccountItemDto';

export class CodefApiResponseResultDto {
    code: CodefApiResultCode;
    extraMessage: string;
    message: string;
    transactionId: string;
}
