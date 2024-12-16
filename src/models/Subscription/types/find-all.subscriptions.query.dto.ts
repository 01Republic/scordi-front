import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {SubscriptionDto} from './Subscription.dto';
import {SubscriptionUsingStatus} from './SubscriptionUsingStatus.enum';

export class FindAllSubscriptionsQuery extends FindAllQueryDto<SubscriptionDto> {
    keyword?: string;
    usingStatus?: SubscriptionUsingStatus;
}
