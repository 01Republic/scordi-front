import {cn} from '^public/lib/utils';
import {Card} from '^public/components/ui/card';
import {Badge} from '^public/components/ui/badge';
import {Progress} from '^public/components/ui/progress';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type/ReviewCampaign.dto';

interface RequestItemCardProps {
    item: ReviewCampaignDto;
}

export const RequestItemCard = (props: RequestItemCardProps) => {
    const {item} = props;

    const isFinished = item.finishAt.getTime() < new Date().getTime();

    const statusText = isFinished ? '완료' : '진행중';

    const badgeColor = isFinished ? 'bg-gray-300' : 'bg-black';

    const progressValue = item.submittedResponseCount
        ? Math.round((item.submittedResponseCount / item.totalResponseCount) * 100)
        : 0;
    const progressBackgroundColor =
        progressValue < 20 ? 'bg-red-500' : progressValue < 80 ? 'bg-orange-500' : 'bg-green-500';
    const progressTextColor =
        progressValue < 20 ? 'text-red-500' : progressValue < 80 ? 'text-red-500' : 'text-green-500';

    return (
        <Card className="p-7 space-y-5 bg-white hover:shadow-lg cursor-pointer">
            <div className={'flex justify-between items-center'}>
                <Badge className={cn('text-white px-2', badgeColor)}>{statusText}</Badge>
                <div className={cn(`text-sm`, isFinished ? 'text-gray-300' : 'text-slate-800')}>
                    {isFinished
                        ? `${item.finishAt.toLocaleDateString()} 완료`
                        : `${item.createdAt.toLocaleDateString()} 생성`}
                </div>
            </div>
            <div className={cn(`text-md line-clamp-2`, isFinished ? 'text-gray-300' : 'text-slate-900')}>
                {item.title}
            </div>
            <div className={'space-y-1'}>
                <div className={cn('text-sm', isFinished ? 'text-gray-300' : 'text-slate-800')}>
                    {/* TODO: 몇명이 응답했는지 모름 */}
                    제출 현황 (4명/10명)
                </div>
                <div className={cn(`flex items-center justify-between gap-4 font-medium`)}>
                    <Progress
                        value={progressValue}
                        className={'h-4 bg-gray-100'}
                        indicatorClassName={cn(isFinished ? 'bg-gray-100' : progressBackgroundColor)}
                    />
                    <span
                        className={cn('text-sm', isFinished ? 'text-gray-300' : progressTextColor)}
                    >{`${progressValue}%`}</span>
                </div>
            </div>
        </Card>
    );
};
