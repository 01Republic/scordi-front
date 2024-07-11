import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {SubscriptionDto} from '^models/Subscription/types';

// CodefCard에 대한 구독조회 요청
export class FindAllSubscriptionByCardQueryDto extends FindAllQueryDto<SubscriptionDto> {
    codefCardId?: number;
}
