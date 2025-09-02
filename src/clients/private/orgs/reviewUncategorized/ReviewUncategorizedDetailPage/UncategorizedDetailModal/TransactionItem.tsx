import {memo} from 'react';
import {Ellipsis} from 'lucide-react';

interface TransactionItemProps {
    item: {
        date: string;
        amount: string;
        description: string;
    };
}

export const TransactionItem = memo((props: TransactionItemProps) => {
    const {item} = props;

    return (
        <div className="px-2 text-sm space-y-4">
            <div>{item.date}</div>
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                    <Ellipsis className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                    <div className="font-semibold">{item.amount}</div>
                    <div className="text-xs text-gray-500 font-normal truncate">{item.description}</div>
                </div>
            </div>
        </div>
    );
});

TransactionItem.displayName = 'TransactionItem';
