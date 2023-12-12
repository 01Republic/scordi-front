import {TypeCast} from '^types/utils/class-transformer';
import {TeamMemberDto} from '^models/TeamMember';
import {SubscriptionDto} from '^models/Subscription/types';

export class TeamMemberSubscriptionDto {
    teamMemberId: number; // 팀 멤버 ID
    @TypeCast(() => TeamMemberDto) teamMember: TeamMemberDto; // 팀 멤버

    subscriptionId: number; // 구독 ID
    @TypeCast(() => SubscriptionDto) subscription: SubscriptionDto; // 구독
}
