import React, {memo} from 'react';
import {FaQuestion} from 'react-icons/fa6';
import {WithChildren} from '^types/global.type';
import {
    TeamMemberDto,
    TeamMemberSubscriptionArrayDto,
    TeamMemberSubscriptionDto,
    TeamMemberSubscriptionOriginData,
} from '^models/TeamMember';
import {Avatar} from '^components/Avatar';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {ProductDto} from '^models/Product/type';
import {SubscriptionDto} from '^models/Subscription/types';

interface TeamSubscriptionsBoxProps extends WithChildren {
    result: TeamMemberSubscriptionOriginData;
    reload: () => any;
}
export const TeamSubscriptionsBox = memo((props: TeamSubscriptionsBoxProps) => {
    const {result, reload} = props;

    const subscriptionItem = result.items.reduce((acc, current) => {
        const {subscriptionId, subscription, teamMember} = current;

        // @ts-ignore
        if (!acc[subscriptionId]) {
            // @ts-ignore
            acc[subscriptionId] = {
                subscriptionId,
                subscription,
                teamMembers: [],
            };
        }
        // @ts-ignore
        acc[subscriptionId].teamMembers.push(teamMember);

        return acc;
    }, {});

    const subscriptionItemArray = Object.values(subscriptionItem as TeamMemberSubscriptionArrayDto);

    return (
        <div className="w-full">
            <ul className="grid grid-cols-2 gap-4">
                {subscriptionItemArray.map((item: TeamMemberSubscriptionArrayDto) => (
                    <li key={item.subscriptionId} className="w-full border bg-white rounded-lg">
                        <div className="flex items-center justify-between p-2">
                            <div className="flex items-center gap-2">
                                <Avatar
                                    className="w-7 h-7"
                                    src={item.subscription.product.image}
                                    alt={item.subscription.product.name()}
                                    draggable={false}
                                    loading="lazy"
                                />
                                <span>{item.subscription.product.name()}</span>
                            </div>
                            <div className="flex avatar-group -space-x-3 overflow-visible">
                                {item.teamMembers.slice(0, 5).map((user) => (
                                    <div>
                                        <TeamMemberAvatar
                                            teamMember={user}
                                            className="w-8 h-8 border-[3px] border-white"
                                        />
                                    </div>
                                ))}
                                {item.teamMembers.length >= 6 && (
                                    <div className="rounded-full w-8 h-8 border-[3px] border-white text-white bg-[#4a4cbe] flex items-center justify-center">
                                        +{item.teamMembers.length - 5}
                                    </div>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
});
TeamSubscriptionsBox.displayName = 'TeamSubscriptionsBox';
