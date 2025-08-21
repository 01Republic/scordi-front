import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {ArrowDown, ArrowUp} from 'lucide-react';

interface SortableTH2Props extends WithChildren {
    sortKey: string;
    sortVal: 'ASC' | 'DESC';
    onClick: (sortKey: string, nextVal: 'ASC' | 'DESC') => void;
    className?: string;
    colSpan?: number;
}

export const SortableTH2 = memo((props: SortableTH2Props) => {
    const {sortKey, sortVal, onClick, className, children, colSpan} = props;

    const isSortable = !!sortKey && !!onClick;
    const nextVal = sortVal === 'ASC' ? 'DESC' : 'ASC';

    const handleSort = () => {
        if (!isSortable) return;
        onClick(sortKey, nextVal);
    };

    return (
        <th onClick={handleSort} className={`cursor-pointer bg-transparent ${className}`} colSpan={colSpan && colSpan}>
            {isSortable ? (
                <div className={`flex items-center ${className}`}>
                    {children} {sortVal === 'DESC' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                </div>
            ) : (
                children
            )}
        </th>
    );
});
