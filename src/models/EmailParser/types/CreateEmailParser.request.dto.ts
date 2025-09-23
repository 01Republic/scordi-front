import {EmailParserFormData} from './EmailParserFormData';

export class CreateEmailParserRequestDto {
    title: string;
    productId: number;
    filterQuery: string;
    memo?: string;
    isActive: boolean;
    parserData: EmailParserFormData;
}
