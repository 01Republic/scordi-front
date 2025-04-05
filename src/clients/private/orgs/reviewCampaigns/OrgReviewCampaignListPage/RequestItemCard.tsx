import { cn } from '^public/lib/utils';
import { Card } from '^public/components/ui/card';
import { Badge } from '^public/components/ui/badge';
import { Progress } from '^public/components/ui/progress';
import { ReviewCampaignDto } from '^models/ReviewCampaign/type/ReviewCampaign.dto';
import { intlDateLong } from '^utils/dateTime';

interface RequestItemCardProps {
    item: ReviewCampaignDto;
}

const STATUS_COLORS = {
    finished: 'bg-gray-300',
    active: 'bg-gray-900',
    expired: 'bg-[#F87171]',
} as const;

const PROGRESS_COLORS = {
    low: '#F87171',
    medium: '#FB923C',
    high: '#34D399',
    finished: '#D6D6D6',
} as const;

const TEXT_COLORS = {
    finished: 'text-gray-300',
    active: 'text-gray-800',
} as const;

const getProgressColor = (percent: number, isFinished: boolean) => {
    if (isFinished) return PROGRESS_COLORS.finished;
    if (percent < 20) return PROGRESS_COLORS.low;
    if (percent < 80) return PROGRESS_COLORS.medium;
    return PROGRESS_COLORS.high;
};

const getStatusText = (item: ReviewCampaignDto, isFinished: boolean) => {
    if (item.closedAt) return '완료';
    if (isFinished) return '기한지남';
    return '진행중';
};

const getDateText = (item: ReviewCampaignDto, isFinished: boolean) => {
    if (item.closedAt) return `${intlDateLong(item.closedAt)} 완료`;
    if (isFinished) return `${intlDateLong(item.finishAt)} 완료`;
    return `${intlDateLong(item.createdAt)} 생성`;
};

const getTextColor = (isClosed: boolean) => {
    return isClosed ? TEXT_COLORS.finished : TEXT_COLORS.active;
};

const getBadgeColor = (isFinished: boolean, isClosed: boolean) => {
    if (isClosed) return STATUS_COLORS.finished;
    if (isFinished) return STATUS_COLORS.expired;
    return STATUS_COLORS.active;
};

export const RequestItemCard = ({ item }: RequestItemCardProps) => {
    const isFinished = item.finishAt.getTime() < new Date().getTime();
    const isClosed = !!item.closedAt;
    const progressPercent = (item.submittedResponseCount / item.totalResponseCount) * 100;
    const progressColor = getProgressColor(progressPercent, isClosed);
    const statusText = getStatusText(item, isFinished);
    const dateText = getDateText(item, isFinished);

    return (
        <Card className="p-7 space-y-5 bg-white hover:shadow-lg cursor-pointer">
            <div className="flex justify-between items-center">
                <Badge 
                    className={cn(
                        'text-white px-2',
                        getBadgeColor(isFinished, isClosed)
                    )}
                >
                    {statusText}
                </Badge>
                <div className={cn('text-sm', getTextColor(isClosed))}>
                    {dateText}
                </div>
            </div>
            
            <div className={cn('text-md line-clamp-2', getTextColor(isClosed))}>
                {item.title}
            </div>
            
            <div className="space-y-1">
                <div className={cn('text-sm', getTextColor(isClosed))}>
                    제출 현황 ({item.submittedResponseCount}명/{item.totalResponseCount}명)
                </div>
                <div
                    className="flex items-center justify-between gap-4 font-medium"
                    style={{ color: progressColor }}
                >
                    <Progress
                        value={progressPercent}
                        className="h-4 bg-gray-100"
                        indicatorStyle={{ backgroundColor: progressColor }}
                    />
                    {progressPercent}%
                </div>
            </div>
        </Card>
    );
};
