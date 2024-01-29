import {ProductDto} from '^models/Product/type';
import {TypeCast} from '^types/utils/class-transformer';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export class ProductSimilarNameDto {
    id: number;
    name: string;
    productId: number | null;

    @TypeCast(() => ProductDto) product?: ProductDto;
}

export type FindAllProductSimilarNameQuery = FindAllQueryDto<ProductSimilarNameDto> & {
    keyword?: string;
};
