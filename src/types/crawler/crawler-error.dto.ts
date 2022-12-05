import {AxiosError} from 'axios';

export enum CrawlerErrors {
    verifyRequest = 'DeviseVerificationError',
    blocked = 'BlockedError',
}

export class CrawlerErrorDto {
    status!: number;
    code!: CrawlerErrors;
    message!: string;
}

export type CrawlerError = Required<AxiosError<CrawlerErrorDto>>;
