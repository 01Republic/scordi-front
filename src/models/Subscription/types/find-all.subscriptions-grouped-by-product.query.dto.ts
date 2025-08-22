import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {ProductDto} from '^models/Product/type';
import {SubscriptionUsingStatus} from '^models/Subscription/types/SubscriptionUsingStatus.enum';

export class FindAllSubscriptionsGroupedByProductDto extends FindAllQueryDto<ProductDto> {
    usingStatus?: SubscriptionUsingStatus;
    organizationId: number;
    keyword?: string;
}
