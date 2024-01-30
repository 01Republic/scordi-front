import {WithChildren} from '^types/global.type';
import {memo, useEffect, useState} from 'react';
import {TiArrowSortedDown, TiArrowSortedUp} from 'react-icons/ti';

interface SortableTHProps extends WithChildren {
    className?: string;
    onClick?: (sortKey: string, value: 'ASC' | 'DESC') => any;
    sortKey?: string;
    sortVal?: 'ASC' | 'DESC';
}

export const SortableTH = memo((props: SortableTHProps) => {
    const {className = '', sortKey, sortVal, onClick, children} = props;
    const [value, setValue] = useState<boolean>();

    useEffect(() => {
        if (!sortVal || sortVal === 'ASC') return;

        setValue(true);
    }, []);

    const isSortable = !!(sortKey && onClick);

    const sort = () => {
        if (!isSortable) return;

        onClick(sortKey, !value ? 'ASC' : 'DESC');
        setValue((v) => !v);
    };

    return (
        <th onClick={sort} className={`cursor-pointer bg-transparent ${className}`}>
            {isSortable ? (
                <div className={`flex items-center ${className}`}>
                    {children} {typeof value === 'boolean' && value ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                </div>
            ) : (
                children
            )}
        </th>
    );
});
