import {FilterType} from './filter-type.enum';

// 속성 정의 클래스
export class PropertyDefinition {
    constructor(
        public name: string,
        public label: string,
        public type: FilterType,
        public options: string[] = [], // select, multi_select용
    ) {}
}
