import {memo} from 'react';
import {ChevronRight} from 'lucide-react';

interface StepProgressItemProps {
    text: string;
    active?: boolean;
    last?: boolean;
}

export const StepProgressItem = memo((props: StepProgressItemProps) => {
    const {text, active = false, last = false} = props;

    return (
        <div
            className={`flex items-center gap-2 cursor-pointer tracking-[0.5px] ${
                active ? 'font-bold text-scordi' : 'text-gray-400 hover:text-scordi'
            }`}
        >
            <span className="text-lg">{text}</span>
            {!last && <ChevronRight />}
        </div>
    );
});
StepProgressItem.displayName = 'StepProgressItem';
