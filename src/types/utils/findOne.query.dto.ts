import {FindOptionsOrder, FindOptionsRelations, FindOptionsWhere} from '^types/utils/find-options';

export class FindOneQueryDto<T> {
    // relations?: FindOptionsRelations<T>;
    relations?: string[];
    // where?: {[P in keyof T]?: T[P] | 'NULL' | {op: 'not'; val: T[P] | 'NULL'}};
    where?: FindOptionsWhere<T>;
    // order?: {[P in keyof T]?: 'ASC' | 'DESC' | 'asc' | 'desc' | 1 | -1};
    order?: FindOptionsOrder<T>;
}
