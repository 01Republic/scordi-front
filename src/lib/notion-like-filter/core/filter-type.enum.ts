// 필터 타입
export enum FilterType {
    TEXT = 'text',
    NUMBER = 'number',
    DATE = 'date',
    BOOLEAN = 'boolean',
    SELECT = 'select',
    MULTI_SELECT = 'multi_select',
}

export const icon_filterType = (type: FilterType) =>
    ({
        [FilterType.TEXT]: '🔤',
        [FilterType.NUMBER]: '#️⃣',
        [FilterType.DATE]: '📆',
        [FilterType.BOOLEAN]: '✅',
        [FilterType.SELECT]: '🏷',
        [FilterType.MULTI_SELECT]: '🏷',
    }[type]);
