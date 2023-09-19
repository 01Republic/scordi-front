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
