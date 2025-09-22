import React, {memo} from 'react';
import {X} from 'lucide-react';
import {SubscriptionDto} from '^models/Subscription/types';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {useCurrentTeam} from '^models/Team/hook';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {LinkTo} from '^components/util/LinkTo';
import {TeamMemberProfile} from '^models/TeamMember/components/TeamMemberProfile';
import {SubscriptionDetailProfile} from '^models/Subscription/components';

interface TeamSubscriptionDetailModalProps {
    isOpened: boolean;
    onClose: () => void;
    subscription: SubscriptionDto | null;
}

export const TeamSubscriptionDetailModal = memo((props: TeamSubscriptionDetailModalProps) => {
    const {isOpened, onClose, subscription} = props;
    const {team} = useCurrentTeam();

    if (!subscription) return <></>;

    const {teamMembers} = subscription;
    if (!teamMembers) return <></>;

    return (
        <BasicModal open={isOpened} onClose={onClose}>
            <div className="flex flex-col gap-5 justify-between p-8 max-w-xl modal-box keep-all">
                <section className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-start w-full">
                        <header className="font-semibold text-20">구독을 이용중인 팀 멤버 </header>
                        <X className="cursor-pointer size-6" onClick={onClose} />
                    </div>
                    <div className="pb-2 pt-3">
                        <SubscriptionDetailProfile
                            subscription={subscription}
                            imageClassName="w-14 h-14"
                            tempImageSize={56}
                        />
                    </div>
                </section>

                <section className="flex flex-col w-full">
                    <div className="flex overflow-y-auto flex-col gap-4 py-3 w-full max-h-80 border-t border-gray-300">
                        <span>
                            {team && (
                                <span>
                                    <b>{team.name}</b>에서
                                </span>
                            )}{' '}
                            총<b>{teamMembers.length}</b>명의 멤버가 쓰고 있어요.
                        </span>
                    </div>

                    <ul className="flex overflow-y-auto flex-col gap-4 py-3 w-full max-h-80 border-t border-b border-gray-300">
                        {teamMembers.map((teamMember) => (
                            <TeamMemberProfile key={teamMember.id} item={teamMember} />
                        ))}
                    </ul>
                </section>

                <LinkTo
                    href={OrgSubscriptionDetailPageRoute.path(subscription.organizationId, subscription.id)}
                    className="btn btn-md text-16 btn-scordi"
                >
                    구독을 이용중인 전체 멤버 확인하기
                </LinkTo>
            </div>
        </BasicModal>
    );
});
