import {FilterOperator} from './filter-operator.enum';
import {FilterType} from './filter-type.enum';
import {FilterValue} from './filter-value';

// 개별 필터 조건 클래스
export class FilterCondition {
    constructor(
        public property: string,
        public operator: FilterOperator,
        public value: FilterValue | FilterValue[] | null = null,
        public type: FilterType = FilterType.TEXT,
    ) {}

    // 조건을 JSON으로 직렬화
    toJSON(): Record<string, any> {
        return {
            property: this.property,
            operator: this.operator,
            value: Array.isArray(this.value) ? this.value.map((v) => v.toString()) : this.value?.toString() || null,
            type: this.type,
        };
    }

    // JSON에서 조건 복원
    static fromJSON(json: Record<string, any>): FilterCondition {
        let value: FilterValue | FilterValue[] | null = null;

        if (json.value) {
            if (Array.isArray(json.value)) {
                value = json.value.map((v: any) => new FilterValue(v.value, v.type));
            } else {
                value = new FilterValue(json.value.value, json.value.type);
            }
        }

        return new FilterCondition(json.property, json.operator, value, json.type);
    }

    // 조건 유효성 검사
    isValid(): boolean {
        if (!this.property || !this.operator) return false;

        // 빈 값 체크 연산자는 value가 필요 없음
        const emptyCheckOperators = [FilterOperator.IS_EMPTY, FilterOperator.IS_NOT_EMPTY];
        if (emptyCheckOperators.includes(this.operator)) {
            return true;
        }

        return this.value !== null;
    }
}
