type ValuesOf<OBJ> = OBJ[keyof OBJ];

const CurrencyValues = {
    en: {code: 'USD', symbol: '$'},
    ko: {code: 'KRW', symbol: '₩'},
} as const;

// Union value types
type CurrencyCodes = ValuesOf<typeof CurrencyValues>['code'];
type CurrencySymbols = ValuesOf<typeof CurrencyValues>['symbol'];
type CurrencyFormats = '%u%n';

export class CurrencyDto {
    text!: string;
    code!: CurrencyCodes;
    symbol!: CurrencySymbols;
    format!: CurrencyFormats;
    amount!: number;
}
