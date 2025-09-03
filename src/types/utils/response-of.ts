import {ClassConstructor, plainToInstance} from 'class-transformer';
import {AxiosResponse} from 'axios';
import {Paginated} from '^types/utils/paginated.dto';

export const paginatedDtoOf =
    <T>(DtoClass: ClassConstructor<T>) =>
    (res: AxiosResponse<Paginated<T>>) => {
        res.data.items = plainToInstance(DtoClass, res.data.items);
        return res;
    };

export const oneDtoOf =
    <T>(DtoClass: ClassConstructor<T>) =>
    (res: AxiosResponse<T>) => {
        res.data = plainToInstance(DtoClass, res.data);
        return res;
    };

export const oneNullableDtoOf =
    <T>(DtoClass: ClassConstructor<T>) =>
    (res: AxiosResponse<T | null>) => {
        res.data = res.data ? plainToInstance(DtoClass, res.data) : null;
        return res;
    };

export const listDtoOf =
    <T>(DtoClass: ClassConstructor<T>) =>
    (res: AxiosResponse<T[]>) => {
        res.data = plainToInstance(DtoClass, res.data || []);
        return res;
    };

export const findAndCountDtoOf = <T>(DtoClass: ClassConstructor<T>) => {
    return (res: AxiosResponse<[items: T[], count: number]>) => {
        const [items, count] = res.data;
        res.data = [plainToInstance(DtoClass, items), count];
        return res;
    };
};

export const getPaginatedItems = <T>(pagedItem?: Paginated<T>) => pagedItem?.items || [];
