import {ReviewResponseSubscriptionDto} from '^models/ReviewResponse/type';
import {getColor} from '^components/util/palette';
import {Card} from '^public/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '^public/components/ui/avatar';
import {TeamTag} from '^models/Team/components/TeamTag';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';
import React from 'react';

interface ResponseSubCardProps {
    responseSub: ReviewResponseSubscriptionDto;
}

export const ResponseSubCard = ({responseSub}: ResponseSubCardProps) => {
    const teamMember = responseSub.teamMember;
    const id = teamMember?.id || 0;
    const name = teamMember?.name || '';
    const email = teamMember?.email || '';
    const avatarColor = getColor(email.length + id);
    const team = teamMember?.team;

    return (
        <Card className="p-4 border rounded-lg bg-white text-sm space-y-2 cursor-pointer" draggable>
            <div className="flex items-center gap-2">
                <Avatar className="w-[20px] h-[20px]">
                    <AvatarImage src={teamMember?.profileImgUrl || ''} alt={teamMember?.name} />
                    <AvatarFallback className={`${avatarColor} text-10`}>
                        {name ? name.substring(0, 1).toUpperCase() : '?'}
                    </AvatarFallback>
                </Avatar>
                <div className="font-medium">{name || '알 수 없음'}</div>
            </div>

            <div className="text-gray-400 text-xs">{email || '-'}</div>

            {team && <TeamTag id={team.id} name={team.name} />}
        </Card>
    );
};

// const ResponseSubCard = ({user}: {user: CategoryUser}) => (
//     <Card className="p-4 border rounded-lg bg-white text-sm space-y-2">
//         <div className="flex items-center gap-2">
//             <Avatar className="h-5 w-5">
//                 <AvatarImage src={user.avatar} alt={user.name} />
//                 <AvatarFallback className="bg-primaryColor-900 text-white">
//                     {user.name.substring(0, 1)}
//                 </AvatarFallback>
//             </Avatar>
//             <div className="font-medium">{user.name}</div>
//         </div>
//         <div className="text-gray-400 text-xs">{user.email}</div>
//         <Badge className={`px-1 py-0.5 text-xs ${user.teamColor}`}>{user.team}</Badge>
//     </Card>
// );
