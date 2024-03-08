import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {SubscriptionDto} from '^models/Subscription/types';

export class FindAllSubscriptionByCardQueryDto extends FindAllQueryDto<SubscriptionDto> {
    codefCardId?: number; // 단일 카드에 대한 구독조회 요청
}
