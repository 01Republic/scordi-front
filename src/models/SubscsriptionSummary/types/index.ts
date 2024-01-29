import {OmitType} from '^types/utils/omit-type';
import {FindAllSubscriptionsQuery} from '^models/Subscription/types';

export class SubscriptionSummaryIndexDto {
    none: number;
    paying: number;
    pending: number;
    failed: number;
    paused: number;
    canceled: number;
    free: number;
    expired: number;
    active: number;
    total: number;
}

export class SubscriptionSummaryQueryDto extends OmitType(FindAllSubscriptionsQuery, ['where']) {
    organizationId: number;
}
