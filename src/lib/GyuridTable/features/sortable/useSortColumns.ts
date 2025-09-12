import {useEffect, useState} from 'react';
import {SortedColumnInterface} from './SortedColumn.interface';

interface UseSortColumnsOption {
    onChange: (column: SortedColumnInterface) => void;
}

export function useSortColumns(initialStates: SortedColumnInterface[], option: UseSortColumnsOption) {
    const {onChange} = option;
    const [sortedColumns, setSortedColumns] = useState(initialStates);

    useEffect(() => {
        onChange(sortedColumns[0] || initialStates[0]);
    }, [sortedColumns]);

    const onSort = (field: string, sortVal: 'ASC' | 'DESC', sortKey?: string) => {
        setSortedColumns([{field, sortKey: sortKey || field, sortVal}]);
    };

    return {
        sortedColumns,
        setSortedColumns,
        onSort,
    };
}
