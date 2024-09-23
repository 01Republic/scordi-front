import {PaginationDto} from './pagination.dto';

type FindOptionsOrderValue =
    | 'ASC'
    | 'DESC'
    | 'asc'
    | 'desc'
    | 1
    | -1
    | {
          direction?: 'asc' | 'desc' | 'ASC' | 'DESC';
          nulls?: 'first' | 'last' | 'FIRST' | 'LAST';
      };

type FindOptionsOrderProperty<Property> = Property extends Promise<infer I>
    ? FindOptionsOrderProperty<NonNullable<I>>
    : Property extends Array<infer I>
    ? FindOptionsOrderProperty<NonNullable<I>>
    : Property extends Function
    ? never
    : Property extends Buffer
    ? FindOptionsOrderValue
    : Property extends Date
    ? FindOptionsOrderValue
    : // : Property extends ObjectID
    // ? FindOptionsOrderValue
    Property extends object
    ? FindOptionsOrder<Property>
    : FindOptionsOrderValue;

type FindOptionsOrder<Entity> = {
    [P in keyof Entity]?: P extends 'toString' ? unknown : FindOptionsOrderProperty<NonNullable<Entity[P]>>;
};

type FindOptionsWherePlainValue<T> = T | 'NULL';
type FindOptionsWhereOperateObj<T> = {
    op: 'not';
    val: FindOptionsWherePlainValue<T>;
};
type FindOptionsWhereValue<T> = FindOptionsWherePlainValue<T> | FindOptionsWhereOperateObj<T>;

export class FindAllQueryDto<T> extends PaginationDto {
    relations?: string[];
    where?: {
        [P in keyof T]?: T[P] | 'NULL' | {op: 'not'; val: T[P] | 'NULL'};
    };
    // order?: {[P in keyof T]?: 'ASC' | 'DESC' | 'asc' | 'desc' | 1 | -1};
    order?: FindOptionsOrder<T>;
    updateCounterCacheColumn?: keyof T;
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
