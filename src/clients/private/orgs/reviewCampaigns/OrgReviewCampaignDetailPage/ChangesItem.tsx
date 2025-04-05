import {useState} from 'react';
import {ChevronDown} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '^public/components/ui/avatar';
import {Badge} from '^public/components/ui/badge';
import {Card} from '^public/components/ui/card';
import {Checkbox} from '^public/components/ui/checkbox';

// Define account types and their respective badge colors
const ACCOUNT_TYPES = {
    DIGITAL: {label: '디지털팀', color: 'bg-green-100 text-green-700'},
    DEVELOPER: {label: '개발팀', color: 'bg-red-100 text-red-700'},
    PLANNING: {label: '기획팀', color: 'bg-blue-100 text-blue-700'},
    FINANCE: {label: '재무팀', color: 'bg-blue-100 text-blue-700'},
};

// Define account data structure
interface Account {
    id: string;
    name: string;
    email: string;
    type: keyof typeof ACCOUNT_TYPES;
    avatar?: string;
}

export default function ChangesItem() {
    const [expanded, setExpanded] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    // Sample account data
    const usedAccounts: Account[] = [
        {id: '1', name: '김규리', email: 'diana@01republic.io', type: 'DIGITAL'},
        {id: '2', name: '김규리', email: 'diana@01republic.io', type: 'DEVELOPER'},
    ];

    const hedgeAccounts: Account[] = [{id: '3', name: '김규리', email: 'diana@01republic.io', type: 'PLANNING'}];

    const unclassifiedAccounts: Account[] = [
        {id: '4', name: '김규리', email: 'diana@01republic.io', type: 'DIGITAL'},
        {id: '5', name: '김규리', email: 'diana@01republic.io', type: 'FINANCE'},
    ];

    // Account card component
    const AccountCard = ({account}: {account: Account}) => (
        <Card className="p-4 border rounded-lg bg-white text-sm space-y-2">
            <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                    <AvatarImage src={account.avatar} alt={account.name} />
                    <AvatarFallback className="bg-primaryColor-900 text-white">
                        {account.name.substring(0, 1)}
                    </AvatarFallback>
                </Avatar>
                <div className="font-medium">{account.name}</div>
            </div>
            <div className="text-gray-400 text-xs">{account.email}</div>
            <Badge className={`px-1 py-0.5 text-xs ${ACCOUNT_TYPES[account.type].color}`}>
                {ACCOUNT_TYPES[account.type].label}
            </Badge>
        </Card>
    );

    return (
        <div className="border rounded-2xl bg-white px-2 py-1.5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center gap-2 cursor-pointer" onClick={() => setExpanded(!expanded)}>
                    <ChevronDown className={`h-5 w-5 transition-transform ${expanded ? '' : '-rotate-90'}`} />
                    <div className="flex items-center gap-2">
                        {/* Icons here */}
                        <span className="font-medium text-sm">슬랙</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label
                        htmlFor="confirm"
                        className="cursor-pointer text-sm border border-gray-300 bg-gray-50 rounded-lg py-2 px-3 space-x-2 flex items-center
                                has-[:checked]:text-primaryColor-900 has-[:checked]:border-primaryColor-900"
                    >
                        <Checkbox id="confirm" onCheckedChange={() => setIsChecked(!isChecked)} />
                        <span className="text-gray-700 font-medium">확인 완료</span>
                    </label>
                </div>
            </div>

            {expanded && (
                <div className="p-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {/* Used Accounts Section */}
                        <div className="bg-green-50 rounded-lg p-2">
                            <div className="flex items-center mb-4 space-x-2 text-green-800">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium bg-green-100 px-2 py-1 rounded-md">
                                        사용 추가된 계정
                                    </span>
                                </div>
                                <span className="font-medium">{usedAccounts.length}</span>
                            </div>
                            <div className="space-y-2">
                                {usedAccounts.map((account) => (
                                    <AccountCard key={account.id} account={account} />
                                ))}
                            </div>
                        </div>

                        {/* Hedge Accounts Section */}
                        <div className="bg-red-50 rounded-lg p-2">
                            <div className="flex items-center mb-4 space-x-2 text-red-800">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium bg-red-100 px-2 py-1 rounded-md">
                                        해지 필요 계정
                                    </span>
                                </div>
                                <span className="font-medium">{hedgeAccounts.length}</span>
                            </div>
                            <div className="space-y-2">
                                {hedgeAccounts.map((account) => (
                                    <AccountCard key={account.id} account={account} />
                                ))}
                            </div>
                        </div>

                        {/* Unclassified Accounts Section */}
                        <div className="bg-amber-50 rounded-lg p-2">
                            <div className="flex items-center mb-4 space-x-2 text-amber-800">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium bg-amber-100 px-2 py-1 rounded-md">
                                        미분류
                                    </span>
                                </div>
                                <span className="font-medium">{unclassifiedAccounts.length}</span>
                            </div>
                            <div className="space-y-2">
                                {unclassifiedAccounts.map((account) => (
                                    <AccountCard key={account.id} account={account} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
