import {PaginationDto} from './pagination.dto';

export class FindAllQueryDto<T> extends PaginationDto {
    where?: {[P in keyof T]?: T[P]};
    order?: {[P in keyof T]?: 'ASC' | 'DESC' | 'asc' | 'desc' | 1 | -1};
    relations?: string[];
}
