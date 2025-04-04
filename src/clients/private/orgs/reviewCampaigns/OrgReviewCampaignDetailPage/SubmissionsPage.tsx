import {Avatar, AvatarFallback, AvatarImage} from '^public/components/ui/avatar';
import {Button} from '^public/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '^public/components/ui/dropdown-menu';
import {ChevronDown, ChevronLeft, ChevronRight, MoreVertical} from 'lucide-react';
import OrgReviewCampaignDetailLayout from './layout';

export interface ScheduleItem {
    id: number;
    name: string;
    email: string;
    status: '미제출' | '제출완료';
    date: string;
    isNotification: boolean;
}

export const scheduleItems: ScheduleItem[] = [
    {
        id: 1,
        name: '김규리',
        email: 'diana@01republic.io',
        status: '미제출',
        date: '2025-03-21 10:30에 알림',
        isNotification: true,
    },
    {
        id: 2,
        name: '김규리',
        email: 'diana@01republic.io',
        status: '제출완료',
        date: '2025-03-26 12:31에 제출됨',
        isNotification: false,
    },
    {
        id: 3,
        name: '김규리',
        email: 'diana@01republic.io',
        status: '제출완료',
        date: '2025-03-26 12:31에 제출됨',
        isNotification: false,
    },
    {
        id: 4,
        name: '김규리',
        email: 'diana@01republic.io',
        status: '미제출',
        date: '2025-03-21 10:30에 알림',
        isNotification: true,
    },
    {
        id: 5,
        name: '김규리',
        email: 'diana@01republic.io',
        status: '미제출',
        date: '2025-03-21 10:30에 알림',
        isNotification: true,
    },
    {
        id: 6,
        name: '김규리',
        email: 'diana@01republic.io',
        status: '미제출',
        date: '2025-03-21 10:30에 알림',
        isNotification: true,
    },
];

export default function OrgReviewCampaignDetailSubmissionPage() {
    return (
        <OrgReviewCampaignDetailLayout>
            <div className="flex mt-6">
                {/* Sidebar */}
                <div className="w-[240px] mr-5">
                    <div className="space-y-2 text-sm">
                        <div className="relative flex items-center space-x-2 rounded-md bg-neutral-100 hover:bg-gray-200 px-2 py-1.5 shadow-sm">
                            <div className="absolute left-0 inset-y-1 w-1 bg-primaryColor-900 rounded-full"></div>
                            <span className="font-medium text-primaryColor-900">전체 6</span>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md hover:bg-gray-200 px-2 py-1.5">
                            <span className="font-medium text-gray-700">미제출자 4</span>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md px-2 py-1.5 hover:bg-gray-200">
                            <span className="font-medium text-gray-700">제출완료자 2</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 pt-0">
                    <h3 className="font-medium text-base">
                        전체 <span className="text-primaryColor-900">6</span>
                    </h3>

                    <div className="border rounded-lg overflow-hidden mt-4 bg-white">
                        <div className="divide-y">
                            {scheduleItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 text-sm">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-7 w-7 rounded-full bg-rose-500">
                                            <AvatarImage src="/placeholder.svg?height=48&width=48" alt={item.name} />
                                            <AvatarFallback className="bg-rose-500 text-white">
                                                {item.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{item.name}</span>
                                            <span className="text-gray-500">{item.email}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <span>{item.date}</span>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={
                                                        item.status === '미제출'
                                                            ? 'bg-primaryColor-900 text-white hover:bg-primaryColor-900/90'
                                                            : ''
                                                    }
                                                >
                                                    {item.status} <ChevronDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-white">
                                                <DropdownMenuItem>미제출</DropdownMenuItem>
                                                <DropdownMenuItem>제출완료</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <Button variant="outline" className="border-gray-200">
                                            {item.status === '미제출' ? '재전송' : '응답 확인'}
                                        </Button>

                                        {item.status === '미제출' && (
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-5 w-5" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-end mt-4">
                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                            <Button variant="ghost" className="px-1 py-0">
                                <ChevronLeft className="h-5 w-5" />
                                <span>이전</span>
                            </Button>
                            <Button variant="ghost" className="px-1 py-0">
                                <span>다음</span>
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </OrgReviewCampaignDetailLayout>
    );
}
