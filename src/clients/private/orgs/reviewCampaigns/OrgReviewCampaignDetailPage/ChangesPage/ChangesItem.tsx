import {ChevronDown} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '^public/components/ui/avatar';
import {Badge} from '^public/components/ui/badge';
import {Card} from '^public/components/ui/card';
import {Checkbox} from '^public/components/ui/checkbox';

interface CategoryUser {
    name: string;
    email: string;
    team: string;
    teamColor: string;
    avatar?: string;
}

interface ApprovalItem {
    id: string;
    serviceName: string;
    isExpanded?: boolean;
    isConfirmed?: boolean;
}

const CATEGORIES = [
    {
        name: '사용 추가된 계정',
        count: 0,
        color: 'bg-green-100 text-green-800',
        users: [] as CategoryUser[],
    },
    {
        name: '해지 필요 계정',
        count: 0,
        color: 'bg-red-100 text-red-800',
        users: [] as CategoryUser[],
    },
    {
        name: '미분류 계정',
        count: 0,
        color: 'bg-amber-100 text-amber-800',
        users: [] as CategoryUser[],
    },
];

export default function ChangesItem({
    approvalItem,
    toggleExpand,
    toggleConfirm,
}: {
    approvalItem: ApprovalItem;
    toggleExpand: (id: string, value?: boolean) => void;
    toggleConfirm: (id: string, value: boolean) => void;
}) {
    const {id, serviceName, isExpanded = false, isConfirmed = false} = approvalItem;

    const AccountCard = ({user}: {user: CategoryUser}) => (
        <Card className="p-4 border rounded-lg bg-white text-sm space-y-2">
            <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primaryColor-900 text-white">
                        {user.name.substring(0, 1)}
                    </AvatarFallback>
                </Avatar>
                <div className="font-medium">{user.name}</div>
            </div>
            <div className="text-gray-400 text-xs">{user.email}</div>
            <Badge className={`px-1 py-0.5 text-xs ${user.teamColor}`}>{user.team}</Badge>
        </Card>
    );

    return (
        <div className="border rounded-2xl bg-white px-2 py-1.5">
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center gap-2 cursor-pointer" onClick={() => toggleExpand(id)}>
                    <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{serviceName}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <label
                        htmlFor={`confirm-${id}`}
                        className="cursor-pointer text-sm border border-gray-300 bg-gray-50 rounded-lg py-2 px-3 space-x-2 flex items-center
                       has-[:checked]:text-primaryColor-900 has-[:checked]:border-primaryColor-900"
                    >
                        <Checkbox
                            id={`confirm-${id}`}
                            checked={isConfirmed}
                            onCheckedChange={(checked) => toggleConfirm(id, Boolean(checked))}
                        />
                        <span className="text-gray-700 font-medium">확인 완료</span>
                    </label>
                </div>
            </div>

            {isExpanded && (
                <div className="p-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {CATEGORIES.map((category, idx) => {
                            return (
                                <div key={idx} className={`${category.color} rounded-lg p-2`}>
                                    <div className="flex items-center mb-4 space-x-2">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-md ${category.color}`}>
                                            {category.name}
                                        </span>
                                        <span className="font-medium">{category.count}</span>
                                    </div>

                                    <div className="space-y-2">
                                        {category.users.map((user, i) => (
                                            <AccountCard key={i} user={user} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
