import {PartialType} from '^types/utils/partial-type';
import {OmitType} from '^types/utils/omit-type';
import {ConnectStatus} from './ConnectStatus';
import {CreateSubscriptionRequestDto} from './CreateSubscription.request.dto';

export class UpdateSubscriptionRequestDto extends PartialType(
    OmitType(CreateSubscriptionRequestDto, ['organizationId', 'masterId']),
) {
    connectStatus?: ConnectStatus; // 연동상태
    isActive?: boolean; // 활성화 여부
    masterId?: number | null; // 관리자 TeamMember ID
    recurringTypeTagId?: number; // 과금방식 태그
}
