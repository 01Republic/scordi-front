import {PaginationDto} from './pagination.dto';
import {FindOptionsOrder, FindOptionsWhere, FindOptionsWhereValue} from './find-options';

export class FindAllQueryDto<T> extends PaginationDto {
    relations?: string[];
    // where?: {[P in keyof T]?: T[P] | 'NULL' | {op: 'not'; val: T[P] | 'NULL'}};
    where?: FindOptionsWhere<T>;
    // order?: {[P in keyof T]?: 'ASC' | 'DESC' | 'asc' | 'desc' | 1 | -1};
    order?: FindOptionsOrder<T>;
    updateCounterCacheColumn?: keyof T;
}

export class SearchQueryDto<T> extends FindAllQueryDto<T> {
    keyword?: string;
}

export function getPureTypeFromWhereValue<T>(value: FindOptionsWhereValue<T>): T {
    // @ts-ignore
    if (value === 'NULL') return null;

    // @ts-ignore
    if (value && typeof value === 'object' && !(value instanceof Array) && value['op']) {
        // @ts-ignore
        return getPureTypeFromWhereValue<T>(value['val']);
    }

    // @ts-ignore
    return value;
}
