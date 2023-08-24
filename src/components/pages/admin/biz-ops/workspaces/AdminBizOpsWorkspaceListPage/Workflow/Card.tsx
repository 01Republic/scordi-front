import {memo} from 'react';
import {getProgressPercentage, ProgressType} from '^api/biz-ops/progress.api';

interface WorkflowCardProps {
    title: string;
    onClick: () => any;
    progress: ProgressType;
}

export const WorkflowCard = memo((props: WorkflowCardProps) => {
    const {title, onClick, progress} = props;
    const {inProgress, taskFile} = progress;
    const percentage = taskFile ? getProgressPercentage(taskFile) : 0;

    return (
        <div
            className="card bg-white card-bordered card-compact shadow w-[200px] h-[180px] cursor-pointer hover:shadow-xl"
            onClick={onClick}
        >
            <div className="card-body">
                <p className="card-title text-sm">{title}</p>
                {inProgress && <p className="text-xs">in progress ... {percentage}%</p>}
            </div>
        </div>
    );
});
