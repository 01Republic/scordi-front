import {TypeCast} from '^types/utils/class-transformer';
import {ProductDto} from '^models/Product/type';

export class EmailParserDto {
    id: number;
    title: string; // 파서 제목 (자유)
    productId: number;
    queryObj: any; // ref. FindAllQuery
    memo: string;
    isActive: boolean;
    @TypeCast(() => Date) createdAt: Date;
    @TypeCast(() => Date) updatedAt: Date;

    @TypeCast(() => ProductDto) product?: ProductDto;
}

export type EmailParserDtoInFactory = EmailParserDto & {product: ProductDto};
