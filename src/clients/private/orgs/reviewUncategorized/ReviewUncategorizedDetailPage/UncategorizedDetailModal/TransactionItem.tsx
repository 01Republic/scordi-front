import {Ellipsis} from 'lucide-react';
import {memo} from 'react';

interface TransactionItemProps {
    item: {
        date: string;
        amount: string;
        description: string;
    };
}

export const TransactionItem = memo(({item}: TransactionItemProps) => {
    return (
        <div className="py-3">
            <div className="text-sm mb-2">{item.date}</div>
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                    <Ellipsis className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-lg font-medium">{item.amount}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                </div>
            </div>
        </div>
    );
});

TransactionItem.displayName = 'TransactionItem';
