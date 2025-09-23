import {FetchedAttachmentFile} from '^models/InvoiceAccount/type';
import {BasePropertyFormData} from './base.property.form-data';

export class BooleanPropertyFormData extends BasePropertyFormData {
    override parse(email: any, html: string, attachments: FetchedAttachmentFile[]): {resultValue: string} {
        const dataSource = this.getDataSource(email, html, attachments);
        const regexResult = this.getRegexResult(dataSource);
        const resultValue = this.getResultValue(dataSource, regexResult);

        return {resultValue: resultValue ? 'True' : 'False'};
    }
}
