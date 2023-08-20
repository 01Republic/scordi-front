import {memo} from 'react';

interface WorkflowCardProps {
    title: string;
    onClick: () => any;
    inProgress: boolean;
}

export const WorkflowCard = memo((props: WorkflowCardProps) => {
    const {title, onClick, inProgress} = props;

    return (
        <div
            className="card bg-white card-bordered card-compact shadow w-[200px] h-[180px] cursor-pointer hover:shadow-xl"
            onClick={onClick}
        >
            <div className="card-body">
                <p className="card-title text-sm">{title}</p>
                {inProgress && <p className="text-xs">in progress ...</p>}
            </div>
        </div>
    );
});
