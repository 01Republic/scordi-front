import {BasePropertyFormData} from './base.property.form-data';

export type DateParserData = {format: string};

export class DatePropertyFormData extends BasePropertyFormData {
    dateParser: DateParserData;
}
