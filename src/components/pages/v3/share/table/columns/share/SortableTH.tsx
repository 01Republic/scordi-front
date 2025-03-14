import {WithChildren} from '^types/global.type';
import {memo, useEffect, useState} from 'react';
import {ArrowDown, ArrowUp} from 'lucide-react';

interface SortableTHProps extends WithChildren {
    className?: string;
    onClick?: (sortKey: string, value: 'ASC' | 'DESC') => any;
    sortKey?: string;
    sortVal?: 'ASC' | 'DESC';
}

export const SortableTH = (props: SortableTHProps) => {
    const {className = '', sortKey, sortVal, onClick, children} = props;
    const [direct, setDirect] = useState<'ASC' | 'DESC'>(sortVal || 'DESC');

    const isSortable = !!(sortKey && onClick);

    const sort = () => {
        if (!isSortable) return;

        setDirect((v) => {
            const newV = v === 'ASC' ? 'DESC' : 'ASC';
            onClick(sortKey, newV);
            return newV;
        });
    };

    return (
        <th onClick={sort} className={`cursor-pointer bg-transparent ${className}`}>
            {isSortable ? (
                <div className={`flex items-center ${className}`}>
                    {children} {direct === 'DESC' ? <ArrowUp /> : <ArrowDown />}
                </div>
            ) : (
                children
            )}
        </th>
    );
};
