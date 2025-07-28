import {FilterGroup} from './filter-group';
import {FilterCondition} from './filter-condition';

// 메인 필터 쿼리 클래스
export class FilterQuery {
    constructor(public rootGroup: FilterGroup = new FilterGroup()) {}

    // 루트에 조건 추가
    addCondition(condition: FilterCondition): void {
        this.rootGroup.addCondition(condition);
    }

    // 루트에 그룹 추가
    addGroup(group: FilterGroup): void {
        this.rootGroup.addGroup(group);
    }

    // 쿼리 초기화
    clear(): void {
        this.rootGroup = new FilterGroup();
    }

    // 쿼리가 비어있는지 확인
    isEmpty(): boolean {
        return this.rootGroup.isEmpty();
    }

    // 쿼리 유효성 확인
    isValid(): boolean {
        return this.rootGroup.isValid();
    }

    // JSON으로 직렬화
    toJSON(): Record<string, any> {
        return {
            rootGroup: this.rootGroup.toJSON(),
        };
    }

    // JSON에서 복원
    static fromJSON(json: Record<string, any>): FilterQuery {
        return new FilterQuery(FilterGroup.fromJSON(json.rootGroup));
    }

    // URL 파라미터로 변환
    toUrlParams(): string {
        return encodeURIComponent(JSON.stringify(this.toJSON()));
    }

    // URL 파라미터에서 복원
    static fromUrlParams(params: string): FilterQuery {
        try {
            const json = JSON.parse(decodeURIComponent(params));
            return FilterQuery.fromJSON(json);
        } catch (error) {
            return new FilterQuery();
        }
    }
}
