import {useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {useReviewResponses} from '^models/ReviewResponse/hook';
import {orgIdParamState, useIdParam} from '^atoms/common';
import {OrgReviewCampaignDetailLayout} from './layout';
import {format} from 'date-fns';
import {Button} from '^public/components/ui/button';
import {Avatar, AvatarFallback} from '^public/components/ui/avatar';
import {Input} from '^public/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '^public/components/ui/dropdown-menu';
import {ChevronDown, MoreVertical, Search} from 'lucide-react';
import {Spinner} from '^components/util/loading';
import {reviewResponseApi} from '^models/ReviewResponse/api';
import {cn} from '^public/lib/utils';
import toast from 'react-hot-toast';
import {useReviewCampaign} from '^models/ReviewCampaign/hook';

export default function OrgReviewCampaignDetailSubmissionsPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const reviewCampaignId = useIdParam('reviewCampaignId');
    const {data: reviewCampaign} = useReviewCampaign(orgId, reviewCampaignId);
    const {data, isLoading, params, search, nextPage} = useReviewResponses(orgId, reviewCampaignId, {
        page: 1,
        relations: ['teamMember'],
    });
    const {items: reviewResponses, pagination} = data;

    const [filter, setFilter] = useState<'all' | 'pending' | 'submitted'>('all');
    const tabs = ['all', 'pending', 'submitted'] as const;

    const handleResend = async (responseId: number) => {
        try {
            await reviewResponseApi.resend(orgId, reviewCampaignId, responseId);
            toast.success('알림이 재전송되었습니다.');
        } catch (error) {
            toast.error('알림 재전송에 실패했습니다.');
        }
    };

    const handleRemove = async (responseId: number) => {
        try {
            await reviewResponseApi.destroy(orgId, reviewCampaignId, responseId);
            toast.success('응답이 삭제되었습니다.');
        } catch (error) {
            toast.error('응답 삭제에 실패했습니다.');
        }
    };

    // if (!reviewCampaign) return <></>;

    const totalCount = reviewCampaign?.totalResponseCount;
    const countSubmitted = reviewCampaign?.submittedResponseCount;
    const countPending = reviewCampaign?.notSubmittedResponseCount;

    return (
        <OrgReviewCampaignDetailLayout>
            <div className="flex mt-6">
                {/* Sidebar */}
                <div className="w-[240px] mr-5">
                    <div className="space-y-2 text-sm">
                        {tabs.map((tab) => (
                            <div
                                key={tab}
                                className={cn(
                                    'relative h-8 flex items-center rounded-md hover:bg-gray-200 px-2 py-1.5 cursor-pointer',
                                    filter === tab && 'bg-primaryColor-bg',
                                )}
                                onClick={() => setFilter(tab)}
                            >
                                {filter === tab && (
                                    <div className="absolute left-0 inset-y-1 w-1 bg-primaryColor-900 rounded-full"></div>
                                )}
                                <div
                                    className={cn(
                                        'font-medium ml-2',
                                        filter === tab ? 'text-primaryColor-900' : 'text-gray-700',
                                    )}
                                >
                                    {tab === 'all'
                                        ? `전체 ${totalCount}`
                                        : tab === 'submitted'
                                        ? `제출완료자 ${countSubmitted}`
                                        : `미제출자 ${countPending}`}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 pt-0">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-base">
                            {filter === 'all' ? '전체' : filter === 'submitted' ? '제출완료자' : '미제출자'}{' '}
                            <span className="text-primaryColor-900">
                                {filter === 'all' ? totalCount : filter === 'submitted' ? countSubmitted : countPending}
                            </span>
                        </h3>

                        <div className="relative w-[240px]">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 transform h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="이름 또는 이메일로 검색"
                                className="pl-8"
                                value={params.keyword}
                                onChange={(e) => {
                                    const keyword = e.target.value.trim();
                                    return search((query) => ({...query, keyword}));
                                }}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center p-8">
                            <Spinner />
                        </div>
                    ) : reviewResponses.length === 0 ? (
                        <div className="text-center p-8 text-gray-500">제출 응답이 없습니다.</div>
                    ) : (
                        <div className="border rounded-lg overflow-hidden mt-4 bg-white">
                            <div className="divide-y">
                                {reviewResponses
                                    .filter(
                                        (response) =>
                                            filter === 'all' ||
                                            (filter === 'submitted' && response.submittedAt) ||
                                            (filter === 'pending' && !response.submittedAt),
                                    )
                                    .map((response) => (
                                        <div
                                            key={response.id}
                                            className="flex items-center justify-between p-4 text-sm"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-7 w-7 rounded-full">
                                                    <AvatarFallback className="bg-primaryColor-100 text-primaryColor-900">
                                                        {response.teamMember?.name
                                                            ? response.teamMember?.name.charAt(0).toUpperCase()
                                                            : '?'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">
                                                        {response.teamMember?.name || '이름 없음'}
                                                    </span>
                                                    <span className="text-gray-500">
                                                        {response.teamMember?.email || '이메일 없음'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <span>{response.statusText}</span>

                                                <div
                                                    className={cn(
                                                        'bg-primaryColor-900 text-white w-24 px-4 py-2 rounded-md text-center',
                                                        response.submittedAt &&
                                                            'bg-white text-gray-900 border border-gray-200',
                                                    )}
                                                >
                                                    {response.submittedAt ? '제출완료' : '미제출'}
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    className="border-gray-200 w-24"
                                                    onClick={() => !response.submittedAt && handleResend(response.id)}
                                                >
                                                    {!response.submittedAt ? '재전송' : '응답 확인'}
                                                </Button>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-5 w-5" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="start"
                                                        className="bg-white"
                                                        onCloseAutoFocus={(e) => e.preventDefault()}
                                                    >
                                                        <DropdownMenuItem
                                                            className="cursor-pointer hover:bg-gray-100"
                                                            onClick={() => handleRemove(response.id)}
                                                        >
                                                            삭제
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {pagination.currentPage < pagination.totalPage && (
                        <div className="flex items-center justify-center mt-4">
                            <Button variant="outline" onClick={() => nextPage()}>
                                더 보기
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </OrgReviewCampaignDetailLayout>
    );
}
