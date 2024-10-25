import {CardTable} from './CardTable';
import {CardTableTH, CardTableTR} from './CardTableTr';
import {PagePerSelect, Paginator} from '^components/Paginator';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import React from 'react';
export * from './CardTable';
export * from './CardTableTr';
export * from './columns';

interface CardTableColumns<T> {
    th: ReactNodeElement;
    className?: string;
    render: (entry: T) => ReactNodeElement;
}

interface CardTablePanelProps<T> extends WithChildren {
    gridClass: string;
    entries: T[];
    columns?: CardTableColumns<T>[];
    ths?: ReactNodeElement[];
    entryComponent?: (entry: T, i: number, arr: T[]) => ReactNodeElement;
    pagination?: PaginationMetaData;
    pageMove?: (pageNum: number) => any;
    changePageSize?: (itemsPerPage: number) => any;
}

export const CardTablePanel = <T,>(props: CardTablePanelProps<T>) => {
    const {
        gridClass,
        entries,
        ths,
        entryComponent,
        columns = [],
        pagination,
        pageMove,
        changePageSize,
        children,
    } = props;

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
                        ) : columns.length ? (
                            <CardTableTH gridClass={gridClass}>
                                {columns.map((column, i) => (
                                    <div key={i} className={column.className}>
                                        {column.th}
                                    </div>
                                ))}
                            </CardTableTH>
                        ) : (
                            <></>
                        )}
                        {children}

                        {entries.map((entry, i, arr) =>
                            entryComponent ? (
                                entryComponent(entry, i, arr)
                            ) : (
                                <CardTableTR key={i} gridClass={gridClass} borderBottom={i + 1 < arr.length}>
                                    {columns.map((column, j) => (
                                        <div key={j} className={column.className}>
                                            {column.render(entry)}
                                        </div>
                                    ))}
                                </CardTableTR>
                            ),
                        )}
                    </CardTable>

                    {pagination && (
                        <div className="flex justify-center w-full mt-6 gap-4">
                            {changePageSize && (
                                <PagePerSelect
                                    defaultValue={pagination.itemsPerPage}
                                    changePageSize={changePageSize}
                                    allowAll
                                />
                            )}

                            {pageMove && (
                                <Paginator
                                    currentPage={pagination.currentPage}
                                    totalPage={pagination.totalPage}
                                    onClick={pageMove}
                                />
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
};
