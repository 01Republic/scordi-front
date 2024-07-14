export enum CreditCardUsingStatus {
    UnDef, // undefined (default)
    NoUse, // 미사용
    InUse, // 사용중
    Expired, // 만료
}

export const creditCardUsingStatus = {
    '': CreditCardUsingStatus.UnDef,
    미사용: CreditCardUsingStatus.UnDef,
    사용중: CreditCardUsingStatus.InUse,
    만료: CreditCardUsingStatus.Expired,
};

export function t_creditCardUsingStatus(value: CreditCardUsingStatus, locale?: any) {
    return getCreditCardUsingStatus(locale)[value] || '???';
}

export function getCreditCardUsingStatus(locale?: any): Record<CreditCardUsingStatus, string> {
    return {
        [CreditCardUsingStatus.UnDef]: '미정',
        [CreditCardUsingStatus.NoUse]: '미사용',
        [CreditCardUsingStatus.InUse]: '사용중',
        [CreditCardUsingStatus.Expired]: '만료됨',
    };
}
