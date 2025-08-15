import {propertyValueOfEmail, SelectedProperty} from './selected-property.enum';
import {GmailItemDto} from '^models/InvoiceAccount/type';
import {getMatchResultForHtml} from '^utils/dom-parser';

export class BasePropertyFormData {
    selectedProperty: SelectedProperty;
    pattern: {value: string; captureIndex: number};

    getDataSource(email: GmailItemDto, html: string): string {
        return propertyValueOfEmail(this.selectedProperty, email, html);
    }

    getRegexResult(dataSource: string): string | string[] {
        const pattern = this.pattern || {};

        // xpath 로 파싱
        if (this.selectedProperty === SelectedProperty.content) {
            return getMatchResultForHtml(dataSource, pattern.value);
        }

        // regex 로 파싱
        try {
            const regex = new RegExp(pattern.value, 'g');
            return [...(regex.exec(dataSource) || [])];
        } catch (e: any) {
            return e.message as string;
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
