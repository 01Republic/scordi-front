import {LogicalOperator} from './logical-operator.enum';
import {FilterCondition} from './filter-condition';

// 필터 그룹 클래스 (중첩된 필터를 위한)
export class FilterGroup {
    constructor(
        public operator: LogicalOperator = LogicalOperator.AND,
        public conditions: FilterCondition[] = [],
        public groups: FilterGroup[] = [],
    ) {}

    // 조건 추가
    addCondition(condition: FilterCondition): void {
        this.conditions.push(condition);
    }

    // 그룹 추가
    addGroup(group: FilterGroup): void {
        this.groups.push(group);
    }

    // 조건 제거
    removeCondition(index: number): void {
        if (index >= 0 && index < this.conditions.length) {
            this.conditions.splice(index, 1);
        }
    }

    // 그룹 제거
    removeGroup(index: number): void {
        if (index >= 0 && index < this.groups.length) {
            this.groups.splice(index, 1);
        }
    }

    // 그룹이 비어있는지 확인
    isEmpty(): boolean {
        return this.conditions.length === 0 && this.groups.length === 0;
    }

    // 모든 조건이 유효한지 확인
    isValid(): boolean {
        const validConditions = this.conditions.every((c) => c.isValid());
        const validGroups = this.groups.every((g) => g.isValid());
        return validConditions && validGroups;
    }

    // JSON으로 직렬화
    toJSON(): Record<string, any> {
        return {
            operator: this.operator,
            conditions: this.conditions.map((c) => c.toJSON()),
            groups: this.groups.map((g) => g.toJSON()),
        };
    }

    // JSON에서 복원
    static fromJSON(json: Record<string, any>): FilterGroup {
        const group = new FilterGroup(json.operator);

        if (json.conditions) {
            group.conditions = json.conditions.map((c: any) => FilterCondition.fromJSON(c));
        }

        if (json.groups) {
            group.groups = json.groups.map((g: any) => FilterGroup.fromJSON(g));
        }

        return group;
    }
}
