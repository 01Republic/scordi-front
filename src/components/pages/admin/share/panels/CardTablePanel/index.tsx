import {ReactNodeLike} from 'prop-types';
import {CardTable} from './CardTable';
import {CardTableTH, CardTableTR} from './CardTableTr';
export * from './CardTable';
export * from './CardTableTr';

interface CardTableColumns<T> {
    th: ReactNodeLike;
    render: (entry: T) => ReactNodeLike;
}

interface CardTablePanelProps<T> {
    gridClass: string;
    entries: T[];
    columns?: CardTableColumns<T>[];
    ths?: ReactNodeLike[];
    entryComponent?: (entry: T, i: number, arr: T[]) => ReactNodeLike;
}

export const CardTablePanel = <T,>(props: CardTablePanelProps<T>) => {
    const {gridClass, entries, ths, entryComponent, columns = []} = props;

    return (
        <CardTable>
            {ths ? (
                <CardTableTH gridClass={gridClass}>
                    {ths.map((th, i) => (
                        <div key={i}>{th}</div>
                    ))}
                </CardTableTH>
            ) : (
                <CardTableTH gridClass={gridClass}>
                    {columns.map((column, i) => (
                        <div key={i}>{column.th}</div>
                    ))}
                </CardTableTH>
            )}

            {entries.map((entry, i, arr) =>
                entryComponent ? (
                    entryComponent(entry, i, arr)
                ) : (
                    <CardTableTR key={i} gridClass={gridClass} borderBottom={i + 1 < arr.length}>
                        {columns.map((column, j) => (
                            <div key={j}>{column.render(entry)}</div>
                        ))}
                    </CardTableTR>
                ),
            )}
        </CardTable>
    );
};
