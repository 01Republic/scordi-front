import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {SubscriptionDto} from './Subscription.dto';

export class FindAllSubscriptionsQuery extends FindAllQueryDto<SubscriptionDto> {
    keyword?: string;
}
