import {GmailItemDto} from '^models/InvoiceAccount/type';
import {getMatchResultForHtml} from '^utils/dom-parser';
import {propertyValueOfEmail, SelectedProperty} from './selected-property.enum';
import {SelectedPatternMethod} from './selected-pattern-method.enum';

export class BasePropertyFormData {
    selectedProperty: SelectedProperty;
    pattern: {
        method?: SelectedPatternMethod;
        value: string;
        captureIndex: number;
    };

    getDataSource(email: GmailItemDto, html: string): string {
        return propertyValueOfEmail(this.selectedProperty, email, html);
    }

    getRegexResult(dataSource: string): string | string[] {
        const pattern = this.pattern || {};
        const {method: patternMethod = SelectedPatternMethod.REGEX, value: patternValue = ''} = pattern;

        switch (patternMethod) {
            case SelectedPatternMethod.XPATH:
                return getMatchResultForHtml(dataSource, patternValue);
            case SelectedPatternMethod.REGEX:
            case SelectedPatternMethod.CODE:
            default:
                return getMatchResultForRegExp(dataSource, patternValue);
        }
    }

    getResultValue(dataSource: string, regexResult: string | string[]): string {
        const pattern = this.pattern || {};
        const extracted = typeof regexResult === 'string' ? regexResult : regexResult[pattern.captureIndex];
        return extracted || dataSource || '데이터 없음';
    }

    parse(email: GmailItemDto, html: string): {resultValue: string} {
        const dataSource = this.getDataSource(email, html);
        const regexResult = this.getRegexResult(dataSource);
        const resultValue = this.getResultValue(dataSource, regexResult);
        return {resultValue};
    }
}

export function getMatchResultForRegExp(dataSource: string, inputValue: string) {
    if (!inputValue) return '';

    try {
        const regex = new RegExp(inputValue, 'g');
        return [...(regex.exec(dataSource) || [])];
    } catch (e: any) {
        return e.message as string;
    }
}
