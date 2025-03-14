import React, {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {teamMemberApi, TeamMemberDto} from '^models/TeamMember';
import {useToast} from '^hooks/useToast';
import {Avatar} from '^components/Avatar';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import {MinusCircle} from 'lucide-react';

interface TeamMemberItemProps {
    subscriptionId: number;
    teamMember: TeamMemberDto;
    onDelete: () => any;
}

export const TeamMemberItem = memo((props: TeamMemberItemProps) => {
    const {toast} = useToast();
    const {teamMember, subscriptionId, onDelete} = props;

    const removeData = () => {
        teamMemberApi.subscriptions.disconnect(teamMember.id, subscriptionId).then(() => {
            toast.success('삭제했습니다');
            onDelete();
        });
    };

    return (
        <li>
            <div className="!w-auto flex items-center gap-4 px-4 py-3 -mx-4 hover:bg-neutral no-selectable rounded-box">
                <TeamMemberAvatar
                    teamMember={teamMember}
                    className="w-9 h-9 outline outline-offset-1 outline-slate-100 rounded-full"
                />

                <div className="flex-1">
                    <p className="font-semibold text-gray-800 max-w-[20rem] overflow-x-auto no-scrollbar leading-none mb-1">
                        {teamMember.name}
                    </p>
                    <p className="text-xs text-gray-400">
                        {teamMember.email || <i className="opacity-70">no email</i>}
                    </p>
                </div>

                <div
                    className="flex items-center tooltip tooltip-top tooltip-error"
                    data-tip="안써요"
                    style={{alignSelf: 'stretch'}}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeData();
                        }}
                        className="relative top-[-2px] text-red-300 hover:text-red-500 transition-all"
                    >
                        <MinusCircle className="" size={24} strokeWidth={0.3} />
                    </button>
                </div>
            </div>
        </li>
    );
});
TeamMemberItem.displayName = 'TeamMemberItem';
