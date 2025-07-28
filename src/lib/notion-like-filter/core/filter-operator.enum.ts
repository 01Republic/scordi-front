// 필터 연산자 열거형
import {FilterType} from '^lib/notion-like-filter';

export enum FilterOperator {
    // 텍스트 연산자
    EQUALS = 'equals',
    NOT_EQUALS = 'not_equals',
    CONTAINS = 'contains',
    NOT_CONTAINS = 'not_contains',
    STARTS_WITH = 'starts_with',
    ENDS_WITH = 'ends_with',
    IS_EMPTY = 'is_empty',
    IS_NOT_EMPTY = 'is_not_empty',

    // 숫자 연산자
    EQUAL = 'equal',
    NOT_EQUAL = 'not_equal',
    GREATER_THAN = 'greater_than',
    GREATER_THAN_OR_EQUAL = 'greater_than_or_equal',
    LESS_THAN = 'less_than',
    LESS_THAN_OR_EQUAL = 'less_than_or_equal',

    // 날짜 연산자
    DATE_IS = 'date_is',
    DATE_BEFORE = 'date_before',
    DATE_AFTER = 'date_after',
    DATE_ON_OR_BEFORE = 'date_on_or_before',
    DATE_ON_OR_AFTER = 'date_on_or_after',

    // 배열 연산자
    IN = 'in',
    NOT_IN = 'not_in',
}

export const t_filterOperator = (op: FilterOperator) =>
    ({
        // 텍스트 연산자
        [FilterOperator.EQUALS]: '값과 동일한 데이터',
        [FilterOperator.NOT_EQUALS]: '값과 동일하지 않은 데이터',
        [FilterOperator.CONTAINS]: '값을 포함하는 데이터',
        [FilterOperator.NOT_CONTAINS]: '값을 포함하지 않는 데이터',
        [FilterOperator.STARTS_WITH]: '시작 값',
        [FilterOperator.ENDS_WITH]: '마지막 값',
        [FilterOperator.IS_EMPTY]: '비어 있음',
        [FilterOperator.IS_NOT_EMPTY]: '비어 있지 않음',

        // 숫자 연산자
        [FilterOperator.EQUAL]: '=',
        [FilterOperator.NOT_EQUAL]: '≠',
        [FilterOperator.GREATER_THAN]: '>',
        [FilterOperator.LESS_THAN]: '<',
        [FilterOperator.GREATER_THAN_OR_EQUAL]: '≥',
        [FilterOperator.LESS_THAN_OR_EQUAL]: '≤',

        // 날짜 연산자
        [FilterOperator.DATE_IS]: '값과 동일한 데이터',
        [FilterOperator.DATE_BEFORE]: '~이전(당일 불포함)',
        [FilterOperator.DATE_AFTER]: '~이후(당일 불포함)',
        [FilterOperator.DATE_ON_OR_BEFORE]: '~이전(당일 포함)',
        [FilterOperator.DATE_ON_OR_AFTER]: '~이후(당일 포함)',

        // 배열 연산자
        [FilterOperator.IN]: '값을 포함하는 데이터',
        [FilterOperator.NOT_IN]: '값을 포함하지 않는 데이터',
    }[op]);

export const getOperatorsForType = (type: FilterType): FilterOperator[] => {
    switch (type) {
        case FilterType.TEXT:
            return [
                FilterOperator.EQUALS,
                FilterOperator.NOT_EQUALS,
                FilterOperator.CONTAINS,
                FilterOperator.NOT_CONTAINS,
                FilterOperator.STARTS_WITH,
                FilterOperator.ENDS_WITH,
                FilterOperator.IS_EMPTY,
                FilterOperator.IS_NOT_EMPTY,
            ];
        case FilterType.NUMBER:
            return [
                FilterOperator.EQUAL,
                FilterOperator.NOT_EQUAL,
                FilterOperator.GREATER_THAN,
                FilterOperator.GREATER_THAN_OR_EQUAL,
                FilterOperator.LESS_THAN,
                FilterOperator.LESS_THAN_OR_EQUAL,
            ];
        case FilterType.DATE:
            return [
                FilterOperator.DATE_IS,
                FilterOperator.DATE_BEFORE,
                FilterOperator.DATE_AFTER,
                FilterOperator.DATE_ON_OR_BEFORE,
                FilterOperator.DATE_ON_OR_AFTER,
            ];
        case FilterType.SELECT:
        case FilterType.MULTI_SELECT:
            return [FilterOperator.EQUALS, FilterOperator.NOT_EQUALS, FilterOperator.IN, FilterOperator.NOT_IN];
        case FilterType.BOOLEAN:
            return [FilterOperator.EQUALS];
        default:
            return [FilterOperator.EQUALS];
    }
};
