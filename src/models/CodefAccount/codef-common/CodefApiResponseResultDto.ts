import {CodefApiResultCode} from './CodefApiResultCode.enum';

export class CodefApiResponseResultDto {
    code: CodefApiResultCode;
    extraMessage: string;
    message: string;
    transactionId: string;
}
