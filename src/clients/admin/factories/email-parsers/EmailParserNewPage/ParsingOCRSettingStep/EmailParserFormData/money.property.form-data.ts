import {CurrencyCode} from '^models/Money';
import {BasePropertyFormData} from './base.property.form-data';

type CurrencyParserStaticData = {
    isDynamicCurrency: false;
    staticCurrencyCode: CurrencyCode;
};

type CurrencyParserDynamicData = {
    isDynamicCurrency: true;
    currencyCodeMappers: {pattern: string; currencyCode: CurrencyCode}[];
};

export type CurrencyParserData = CurrencyParserStaticData | CurrencyParserDynamicData;

export class MoneyPropertyFormData extends BasePropertyFormData {
    currencyParser: CurrencyParserData;
}
