import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {ProductDto} from '^models/Product/type';

export class FindAllSubscriptionsGroupedByProductDto extends FindAllQueryDto<ProductDto> {
    organizationId: number;
    keyword?: string;
}
