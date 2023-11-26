import {memo} from 'react';
import {ComponentLike, renderOne} from '^components/util/ComponentLike';

interface SummaryCardProps {
    icon: ComponentLike;
    label: string;
    value: number;
    className?: string;
}

export const SummaryCard = memo((props: SummaryCardProps) => {
    const {icon, label, value, className = ''} = props;

    return (
        <div className={`card shadow bg-white flex flex-row items-center p-4 ${className}`}>
            <div className="mr-3">{renderOne(icon)}</div>
            <div className="grow font-semibold">{label}</div>
            <div className="text-xl font-semibold">{value.toLocaleString()}</div>
        </div>
    );
});
SummaryCard.displayName = 'SummaryCard';
