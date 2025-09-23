import {FilterType} from './filter-type.enum';

// 필터 값 클래스
export class FilterValue {
    constructor(public value: string | number | boolean | Date | null, public type: FilterType) {}

    // 값을 문자열로 변환
    toString(): string {
        if (this.value === null) return '';
        if (this.type === FilterType.DATE && this.value instanceof Date) {
            return this.value.toISOString();
        }
        return String(this.value);
    }

    // 값을 적절한 타입으로 파싱
    static parse(value: string, type: FilterType): FilterValue {
        switch (type) {
            case FilterType.NUMBER:
                return new FilterValue(parseFloat(value), type);
            case FilterType.BOOLEAN:
                return new FilterValue(value === 'true', type);
            case FilterType.DATE:
                return new FilterValue(new Date(value), type);
            default:
                return new FilterValue(value, type);
        }
    }
}
