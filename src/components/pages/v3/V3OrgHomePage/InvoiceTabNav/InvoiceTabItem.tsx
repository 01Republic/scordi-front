import {memo} from 'react';

interface InvoiceTabItemProps {
    name: string;
    count: number;
}

export const InvoiceTabItem = memo((props: InvoiceTabItemProps) => {
    const {name, count = 0} = props;

    return (
        <p className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">{name}</span>
            <span className="text-xs font-semibold text-gray-500">{count}</span>
        </p>
    );
});
