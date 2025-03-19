import {Card} from '^public/components/ui/card';
import {Badge} from '^public/components/ui/badge';
import {Progress} from '^public/components/ui/progress';
import {cn} from '^public/lib/utils';

interface RequestItemCardProps {
    status: string;
    date: string;
    title: string;
    progress: number;
    goal: number;
}

export const RequestItemCard = (props: RequestItemCardProps) => {
    const {status, date, title, progress, goal} = props;

    const isFinished = status === '완료';

    const finishedTextColor = 'text-gray-300';

    const badgeColor = isFinished ? 'bg-slate-300' : 'bg-black';

    const progressPercent = (progress / goal) * 100;

    const progressColor = progressPercent < 20 ? 'red' : progressPercent < 80 ? 'yellow' : 'green';

    return (
        <Card className="p-4 space-y-5 bg-white">
            <div className={'flex justify-between items-center'}>
                <Badge className={cn('text-sm text-white px-2', badgeColor)}>{status}</Badge>
                <div className={cn(`text-sm`, isFinished ? finishedTextColor : 'text-gray-500')}>{date}</div>
            </div>
            <div className={cn(`text-md`, isFinished ? finishedTextColor : 'text-gray-800')}>{title}</div>
            <div>
                <div className={cn('text-sm', isFinished ? finishedTextColor : 'text-gray-500')}>
                    제출 현황 ({progress}명/{goal}명)
                </div>
                <div
                    className={cn(
                        `flex items-center justify-between gap-4 font-medium`,
                        isFinished ? finishedTextColor : `text-${progressColor}-500`,
                    )}
                >
                    <Progress
                        value={progressPercent}
                        className={'h-4 bg-gray-100'}
                        indicatorClassName={isFinished ? 'bg-slate-300' : `bg-${progressColor}-500`}
                    />
                    {progressPercent}%
                </div>
            </div>
        </Card>
    );
};
