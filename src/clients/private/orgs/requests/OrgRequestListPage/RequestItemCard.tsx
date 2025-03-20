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

    const badgeColor = isFinished ? 'bg-gray-300' : 'bg-black';

    const progressPercent = (progress / goal) * 100;

    const progressColor = progressPercent < 20 ? '#F87171' : progressPercent < 80 ? '#FB923C' : '#34D399';

    return (
        <Card className="p-4 space-y-5 bg-white hover:shadow-lg">
            <div className={'flex justify-between items-center'}>
                <Badge className={cn('text-white px-2', badgeColor)}>{status}</Badge>
                <div className={cn(`text-sm`, isFinished ? finishedTextColor : 'text-slate-800')}>{date}</div>
            </div>
            <div className={cn(`text-md`, isFinished ? finishedTextColor : 'text-slate-900')}>{title}</div>
            <div>
                <div className={cn('text-sm', isFinished ? finishedTextColor : 'text-slate-800')}>
                    제출 현황 ({progress}명/{goal}명)
                </div>
                <div
                    className={`flex items-center justify-between gap-4 font-medium`}
                    style={{color: isFinished ? '#D6D6D6' : progressColor}}
                >
                    <Progress
                        value={progressPercent}
                        className={'h-4 bg-gray-100'}
                        indicatorStyle={{backgroundColor: isFinished ? '#D6D6D6' : progressColor}}
                    />
                    {progressPercent}%
                </div>
            </div>
        </Card>
    );
};
