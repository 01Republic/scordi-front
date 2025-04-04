'use client';

import {useState} from 'react';
import {Checkbox} from '^public/components/ui/checkbox';
import {Progress} from '^public/components/ui/progress';
import {Badge} from '^public/components/ui/badge';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '^public/components/ui/collapsible';
import {ChevronDown, ChevronRight, User} from 'lucide-react';
import OrgReviewCampaignDetailLayout from './layout';
import ChangesItem from './ChangesItem';

interface ApprovalItem {
    id: string;
    serviceName: string;
    serviceType: string;
    isExpanded?: boolean;
    isConfirmed?: boolean;
    categories: {
        name: string;
        count: number;
        color: string;
        users: {
            name: string;
            email: string;
            team: string;
            teamColor: string;
        }[];
    }[];
}

export default function OrgReviewCampaignDetailChangesPage() {
    const [approvalItems, setApprovalItems] = useState<ApprovalItem[]>([
        {
            id: '1',
            serviceName: '서비스명',
            serviceType: '구독 변경',
            isExpanded: false,
            isConfirmed: true,
            categories: [
                {
                    name: '사용 추가된 계정',
                    count: 2,
                    color: 'bg-green-100 text-green-800',
                    users: [
                        {
                            name: '김규리',
                            email: 'diana@01republic.io',
                            team: '디자인팀',
                            teamColor: 'bg-green-100 text-green-800',
                        },
                        {
                            name: '김규리',
                            email: 'diana@01republic.io',
                            team: '개발팀',
                            teamColor: 'bg-red-100 text-red-800',
                        },
                    ],
                },
                {
                    name: '해지 필요 계정',
                    count: 1,
                    color: 'bg-red-100 text-red-800',
                    users: [
                        {
                            name: '김규리',
                            email: 'diana@01republic.io',
                            team: '기획팀',
                            teamColor: 'bg-blue-100 text-blue-800',
                        },
                    ],
                },
                {
                    name: '미분류',
                    count: 2,
                    color: 'bg-amber-100 text-amber-800',
                    users: [
                        {
                            name: '김규리',
                            email: 'diana@01republic.io',
                            team: '디자인팀',
                            teamColor: 'bg-green-100 text-green-800',
                        },
                        {
                            name: '김규리',
                            email: 'diana@01republic.io',
                            team: '재무팀',
                            teamColor: 'bg-blue-200 text-blue-800',
                        },
                    ],
                },
            ],
        },
        {
            id: '2',
            serviceName: '서비스명',
            serviceType: '구독 변경',
            isExpanded: false,
            isConfirmed: false,
            categories: [
                {
                    name: '사용 추가된 계정',
                    count: 2,
                    color: 'bg-green-100 text-green-800',
                    users: [
                        {
                            name: '김규리',
                            email: 'diana@01republic.io',
                            team: '디자인팀',
                            teamColor: 'bg-green-100 text-green-800',
                        },
                    ],
                },
            ],
        },
        {
            id: '3',
            serviceName: '서비스명',
            serviceType: '구독 변경',
            isExpanded: false,
            isConfirmed: false,
            categories: [
                {
                    name: '사용 추가된 계정',
                    count: 2,
                    color: 'bg-green-100 text-green-800',
                    users: [
                        {
                            name: '김규리',
                            email: 'diana@01republic.io',
                            team: '디자인팀',
                            teamColor: 'bg-green-100 text-green-800',
                        },
                    ],
                },
            ],
        },
    ]);

    const [progress, setProgress] = useState(33);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const toggleExpand = (id: string) => {
        setApprovalItems(
            approvalItems.map((item) => (item.id === id ? {...item, isExpanded: !item.isExpanded} : item)),
        );
    };

    const toggleConfirm = (id: string, value: boolean) => {
        const updatedItems = approvalItems.map((item) => (item.id === id ? {...item, isConfirmed: value} : item));

        setApprovalItems(updatedItems);

        // Calculate progress
        const confirmedCount = updatedItems.filter((item) => item.isConfirmed).length;
        const newProgress = Math.round((confirmedCount / totalSteps) * 100);
        setProgress(newProgress);
        setCurrentStep(confirmedCount);
    };

    return (
        <OrgReviewCampaignDetailLayout>
            <div className="flex mt-6">
                {/* Sidebar */}
                <div className="w-[240px] mr-5">
                    <div className="space-y-2 text-sm">
                        <div className="relative flex items-center space-x-2 rounded-md bg-neutral-100 hover:bg-gray-200 px-2 py-1.5 shadow-sm">
                            <div className="absolute left-0 inset-y-1 w-1 bg-primaryColor-900 rounded-full"></div>
                            <span className="font-medium text-primaryColor-900">서비스명 - 구독 별칭</span>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md hover:bg-gray-200 px-2 py-1.5">
                            <span className="font-medium text-gray-700">서비스명 - 구독 별칭</span>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md px-2 py-1.5 hover:bg-gray-200">
                            <span className="font-medium text-gray-700">서비스명 - 구독 별칭</span>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">승인 대기중 (3)</h2>
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-gray-700">
                                    {currentStep} / {totalSteps} 확인 완료
                                </span>
                                <Progress
                                    value={progress}
                                    className="w-32 h-2 mt-1.5 bg-neutral-100"
                                    indicatorClassName="bg-primaryColor-900"
                                />
                            </div>
                            <label
                                htmlFor="confirm-all"
                                className="cursor-pointer text-sm border border-gray-300 bg-gray-50 rounded-lg py-1 px-2 space-x-2 flex items-center
                                has-[:checked]:text-primaryColor-900 has-[:checked]:border-primaryColor-900"
                            >
                                <Checkbox id="confirm-all" />
                                <span className="text-gray-700 font-medium">전체 확인 완료</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {approvalItems.map((item) => (
                            <ChangesItem key={item.id} />
                        ))}
                    </div>
                </div>
            </div>
        </OrgReviewCampaignDetailLayout>
    );
}
