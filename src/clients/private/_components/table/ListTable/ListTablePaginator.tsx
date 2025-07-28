import React, {memo} from 'react';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {WithChildren} from '^types/global.type';
import {ChevronLeft, ChevronRight} from 'lucide-react';

interface ListTablePaginatorProps {
    pagination: PaginationMetaData;
    movePage?: (page: number, append?: boolean) => any;
    onChangePerPage?: (val: number) => any;
    unit?: string;
    options?: number[];
}

export const ListTablePaginator = memo((props: ListTablePaginatorProps) => {
    const {pagination, movePage, onChangePerPage, unit = '개', options} = props;

    const totalCount = pagination.totalItemCount;
    const currentCount = pagination.currentItemCount;
    const currentPage = pagination.currentPage;

    return (
        <div className="flex items-center gap-6">
            <div>
                전체{' '}
                <span>
                    <span>{totalCount.toLocaleString()}</span>
                    {unit}
                </span>{' '}
                중{' '}
                <span>
                    <span>{currentCount.toLocaleString()}</span>
                    {unit}
                </span>
            </div>

            {onChangePerPage && (
                <div className="flex items-center gap-2">
                    <div>최대 표시</div>
                    <select
                        className="select select-sm select-bordered"
                        key={totalCount}
                        defaultValue={pagination.itemsPerPage}
                        onChange={(e) => {
                            return onChangePerPage(parseInt(e.target.value));
                        }}
                    >
                        {(options || [10, 30, 50, 100, 0]).map((num, i) => (
                            <option value={num} key={i}>
                                {num ? `${num}${unit}` : '전체'}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {movePage && (
                <div className="flex items-center gap-2">
                    <PageButton onClick={() => movePage(currentPage - 1)} disabled={pagination.currentPage <= 1}>
                        <ChevronLeft fontSize={14} />
                        <span>이전</span>
                    </PageButton>

                    <PageButton
                        onClick={() => movePage(currentPage + 1)}
                        disabled={pagination.totalPage <= pagination.currentPage}
                    >
                        <span>다음</span>
                        <ChevronRight fontSize={14} />
                    </PageButton>
                </div>
            )}
        </div>
    );
});
ListTablePaginator.displayName = 'ListTablePaginator';

interface Props extends WithChildren {
    onClick?: () => any;
    disabled?: boolean;
}

const PageButton = memo((props: Props) => {
    const {onClick, disabled = false, children} = props;

    return (
        <div
            className={`flex items-center gap-1 ${disabled ? 'text-gray-400 cursor-default' : 'cursor-pointer'}`}
            onClick={() => (!disabled && onClick ? onClick() : undefined)}
        >
            {children}
        </div>
    );
});
