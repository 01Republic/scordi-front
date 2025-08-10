import {EmailParserFormData} from '^admin/factories/email-parsers/EmailParserNewPage/ParsingOCRSettingStep/EmailParserFormData';

export class CreateEmailParserRequestDto {
    title: string;
    productId: number;
    filterQuery: string;
    memo?: string;
    isActive: boolean;
    parserData: EmailParserFormData;
}
