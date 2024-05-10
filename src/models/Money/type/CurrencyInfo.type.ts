import {CurrencyCode} from './CurrencyCode.enum';

export type CurrencyInfo = {
    code: CurrencyCode;
    symbol: string;
    local?: string;
    unit: string;
    abbreviation?: string;
    format: string;
    desc: string;
};

export class CurrencyInfoWithExchangeRate {
    code: CurrencyCode;
    name: string;
    unit: string;
    exchangeRate: number;
    isDefault: boolean;
}
