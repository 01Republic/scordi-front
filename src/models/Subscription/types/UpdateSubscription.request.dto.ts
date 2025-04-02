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
    // UpdateSubscriptionRequestDto에 invoiceAccountId가 number 타입으로 작성되어 있음. => invoiceAccountId가 number 타입으로 사용하는 곳이 많음 리펙토링 필요.
    // 다중 선택을 위해서는 invoiceAccountId가 배열일 수 밖에 없음.
    //그래서 임시로 만듬..
    invoiceAccountIdsForMulti?: number[];
}
