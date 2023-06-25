import {ReactNodeLike} from 'prop-types';
import {CardTable} from './CardTable';
import {CardTableTH, CardTableTR} from './CardTableTr';
import {Paginator} from '^components/Paginator';
import {PaginationMetaData} from '^types/utils/paginated.dto';
export * from './CardTable';
export * from './CardTableTr';
export * from './columns';

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
    pagination?: PaginationMetaData;
    pageMove?: (pageNum: number) => any;
}

export const CardTablePanel = <T,>(props: CardTablePanelProps<T>) => {
    const {gridClass, entries, ths, entryComponent, columns = [], pagination, pageMove} = props;

    return (
        <>
            {entries.length === 0 ? (
                <div>결과가 없습니다.</div>
            ) : (
                <>
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

                    {pagination && pageMove && (
                        <div className="flex justify-center w-full mt-6">
                            <Paginator
                                currentPage={pagination.currentPage}
                                totalPage={pagination.totalPage}
                                onClick={pageMove}
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
};
