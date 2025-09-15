import {Dispatch, SetStateAction, useCallback} from 'react';
import {ColumnDef} from '^lib/GyuridTable';

interface UseVisibleColumnsOption {
    //
}

export function useVisibleColumns(
    columnDefs: ColumnDef<any>[],
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<any>[]>>,
    option: UseVisibleColumnsOption = {},
) {
    // const [originalColumnDefs, setOriginalColumnDefs] = useState(columnDefs);

    const setColumn = useCallback(
        (field: string, hide?: boolean) => {
            setColumnDefs((columns) => {
                return columns.map((column) => {
                    const col = {...column};
                    if (column.field === field) {
                        // hide 값이 주어지면, 주어진 값으로 지정하고
                        // hide 값이 주어지지 않으면, 기존 값을 반전시킨다.
                        col.hide = typeof hide === 'boolean' ? hide : !column.hide;
                    }
                    return col;
                });
            });
        },
        [setColumnDefs],
    );

    const setAllColumns = useCallback(
        (hide: boolean) => {
            setColumnDefs((cols) => {
                return cols.map((c) => ({...c, hide}));
            });
        },
        [setColumnDefs],
    );

    const getVisibles = useCallback(<T>(columnDefs: ColumnDef<T>[]) => {
        return columnDefs.filter((col) => !col.hide);
    }, []);

    const getInVisibles = useCallback(<T>(columnDefs: ColumnDef<T>[]) => {
        return columnDefs.filter((col) => col.hide);
    }, []);

    return {
        getVisibles,
        getInVisibles,
        showColumn: (field: string) => setColumn(field, false),
        hideColumn: (field: string) => setColumn(field, true),
        showAllColumns: () => setAllColumns(false),
        hideAllColumns: () => setAllColumns(true),
        toggleVisible: (field: string) => setColumn(field),
    };
}
