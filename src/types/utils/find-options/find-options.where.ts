type PrimitiveTypeOf<V> = V | 'NULL';

type FindOptionsWherePlainValue<V> = V extends object ? FindOptionsWhere<V> : PrimitiveTypeOf<V>;

type FindOptionsWhereOperateObj<V> = {
    op: 'not' | 'mt' | 'lt' | 'lte' | 'mte' | 'like';
    val: FindOptionsWherePlainValue<V>;
};

// (V | 'NULL') | { op: 'not', val: (V | 'NULL') }
export type FindOptionsWhereValue<T> = FindOptionsWherePlainValue<T> | FindOptionsWhereOperateObj<T>;

export type FindOptionsWhere<T> = {[P in keyof T]?: FindOptionsWhereValue<T[P]>};
