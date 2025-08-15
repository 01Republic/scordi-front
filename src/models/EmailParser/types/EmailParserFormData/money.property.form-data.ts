import {CurrencyCode} from '^models/Money';
import {GmailItemDto} from '^models/InvoiceAccount/type';
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

    override parse(email: GmailItemDto, html: string): {resultValue: string} {
        const dataSource = this.getDataSource(email, html);
        const regexResult = this.getRegexResult(dataSource);
        const resultValue = this.getResultValue(dataSource, regexResult);

        if (this.currencyParser.isDynamicCurrency) {
            const [result] = [regexResult].flat();
            const mappers = this.currencyParser.currencyCodeMappers || [];
            const mapper = mappers.find(({pattern}) => result.match(pattern));
            return mapper
                ? {resultValue: `${resultValue} (${mapper.currencyCode})`}
                : {resultValue: `${resultValue} (ERROR)`};
        } else {
            const currencyCode = this.currencyParser.staticCurrencyCode;
            return {resultValue: `${resultValue} (${currencyCode})`};
        }
    }
}
