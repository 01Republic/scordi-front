import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {SubscriptionDto} from '^models/Subscription/types';
import {truncate} from '^components/util/string';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {LinkTo} from '^components/util/LinkTo';

interface TeamSubscriptionCardProps {
    item: SubscriptionDto;
}

export const TeamSubscriptionCard = memo((props: TeamSubscriptionCardProps) => {
    const {item: subscription} = props;

    const {product, teamMembers = []} = subscription;

    const memberMaxLength = 3;

    return (
        <li className="w-full border bg-white rounded-lg flex items-center">
            <LinkTo
                href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                className="w-full flex items-center justify-between p-4"
            >
                <div className="flex items-center gap-2">
                    <Avatar
                        className="w-7 h-7"
                        src={product.image}
                        alt={product.name()}
                        draggable={false}
                        loading="lazy"
                    />
                    <div>
                        <span className="text-14 font-semibold block text-max-line [--line-clamp-size:2]">
                            {product.name()}
                        </span>
                    </div>
                </div>

                <div className="flex avatar-group -space-x-2.5 overflow-visible">
                    {teamMembers.slice(0, memberMaxLength).map((teamMember) => (
                        <TeamMemberAvatar
                            key={teamMember.id}
                            teamMember={teamMember}
                            className="w-7 h-7 border-[2.5px] border-white z-[2]"
                        />
                    ))}
                    {teamMembers.length >= memberMaxLength + 1 && (
                        <div className="rounded-full text-12 w-7 h-7 z-[2] border-[3px] border-white text-white bg-[#4a4cbe] flex items-center justify-center">
                            +{teamMembers.length - memberMaxLength}
                        </div>
                    )}
                </div>
            </LinkTo>
        </li>
    );
});
TeamSubscriptionCard.displayName = 'TeamSubscriptionCard';
