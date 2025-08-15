import {BasePropertyFormData} from './base.property.form-data';

export class BooleanPropertyFormData extends BasePropertyFormData {
    override parse(email: any, html: string): {resultValue: string} {
        const dataSource = this.getDataSource(email, html);
        const regexResult = this.getRegexResult(dataSource);
        const resultValue = this.getResultValue(dataSource, regexResult);

        return {resultValue: resultValue ? 'True' : 'False'};
    }
}
