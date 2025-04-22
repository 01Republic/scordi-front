import React from 'react';
import {Card} from '^public/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '^public/components/ui/avatar';
import {ReviewResponseSubscriptionDto} from '^models/ReviewResponse/type';
import {TeamTag} from '^models/Team/components/TeamTag';
import {getColor} from '^components/util/palette';

interface ResponseSubCardProps {
    responseSub: ReviewResponseSubscriptionDto;
    onDragStart: () => any;
    onDragEnd: () => any;
}

export const ResponseSubCard = (props: ResponseSubCardProps) => {
    const {responseSub, onDragStart, onDragEnd} = props;

    const teamMember = responseSub.teamMember;
    const id = teamMember?.id || 0;
    const name = teamMember?.name || '';
    const email = teamMember?.email || '';
    const avatarColor = getColor(email.length + id);
    const team = teamMember?.team;

    return (
        <Card
            className="p-4 border rounded-lg bg-white text-sm space-y-2 cursor-pointer"
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragEnter={(e) => e.stopPropagation()}
            onDrop={(e) => e.stopPropagation()}
        >
            <div className="flex items-center gap-2">
                <Avatar className="w-[24px] h-[24px]">
                    <AvatarImage src={teamMember?.profileImgUrl || ''} alt={teamMember?.name} />
                    <AvatarFallback className={`${avatarColor}`}>
                        <span className="w-full h-full flex items-center justify-center text-white text-12">
                            {name ? name.substring(0, 1).toUpperCase() : '?'}
                        </span>
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
