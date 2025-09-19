import {parse} from 'date-fns';
import {FetchedAttachmentFile, GmailItemDto} from '^models/InvoiceAccount/type';
import {BasePropertyFormData} from './base.property.form-data';

export type DateParserData = {format: string};

export class DatePropertyFormData extends BasePropertyFormData {
    dateParser: DateParserData;

    override parse(email: GmailItemDto, html: string, attachments: FetchedAttachmentFile[]): {resultValue: string} {
        const dataSource = this.getDataSource(email, html, attachments);
        const regexResult = this.getRegexResult(dataSource);
        const resultValue = this.getResultValue(dataSource, regexResult);

        const dateFormat = this.dateParser.format || '';
        const dateString = (() => {
            if (!dateFormat) return resultValue;
            const parsed = parse(resultValue, dateFormat, new Date());
            return isNaN(parsed.valueOf()) ? resultValue : parsed.toLocaleString();
        })();

        return {resultValue: dateString};
    }
}
