import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export interface ColumnProps<T, P = FindAllQueryDto<T>> {
    item: T;
    fetchData?: (params: P) => any;
}
