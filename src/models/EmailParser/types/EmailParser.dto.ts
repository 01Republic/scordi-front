import {TypeCast} from '^types/utils/class-transformer';
import {ProductDto} from '^models/Product/type';
import {FilterQuery} from '^lib/notion-like-filter';
import {Transform} from 'class-transformer';
import {EmailParserFormData} from './EmailParserFormData';

export class EmailParserDto {
    id: number;
    title: string; // 파서 제목 (자유)
    productId: number;

    @Transform(({value}) => {
        if (value instanceof FilterQuery) return value;
        return FilterQuery.fromJSON(value);
    })
    filterQuery: FilterQuery;

    @TypeCast(() => EmailParserFormData)
    propertyParsers: EmailParserFormData;

    memo: string;
    isActive: boolean;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => ProductDto) product?: ProductDto;
}

export type EmailParserDtoInFactory = EmailParserDto & {product: ProductDto};
