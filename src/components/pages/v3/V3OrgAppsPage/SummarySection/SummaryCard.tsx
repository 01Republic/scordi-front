import {memo} from 'react';
import {ComponentLike, renderOne} from '^components/util/ComponentLike';

interface SummaryCardProps {
    isLoading: boolean;
    icon: ComponentLike;
    label: string;
    value: number;
    className?: string;
}

export const SummaryCard = memo((props: SummaryCardProps) => {
    const {isLoading, icon, label, value, className = ''} = props;

    return (
        <div
            className={`card shadow bg-white flex flex-row items-center p-4 ${className} ${
                isLoading ? `!text-gray-500` : ''
            }`}
        >
            <div className="mr-3">{renderOne(icon)}</div>
            <div className="grow flex items-center">
                <div className="grow font-semibold">{label}</div>
                {isLoading ? (
                    <div className="text-xl font-semibold">
                        <div className="animate-pulse rounded-full bg-slate-200 w-[60px] h-[28px]" />
                    </div>
                ) : (
                    <div className="text-xl font-semibold">{value.toLocaleString()}</div>
                )}
            </div>
        </div>
    );
});
SummaryCard.displayName = 'SummaryCard';
