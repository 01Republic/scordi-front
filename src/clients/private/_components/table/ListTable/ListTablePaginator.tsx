import React, {memo} from 'react';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {WithChildren} from '^types/global.type';
import {ChevronLeft, ChevronRight} from 'lucide-react';

interface ListTablePaginatorProps {
    pagination: PaginationMetaData;
    movePage?: (page: number, append?: boolean) => any;
    onChangePerPage?: (val: number) => any;
    unit?: string;
}

export const ListTablePaginator = memo((props: ListTablePaginatorProps) => {
    const {pagination, movePage, onChangePerPage, unit = '개'} = props;

    const totalCount = pagination.totalItemCount;
    const currentCount = pagination.currentItemCount;
    const currentPage = pagination.currentPage;

    return (
        <div className="flex items-center gap-6">
            <div className="flex gap-1">
                <span className="hidden md:flex">전체</span>

                <div className="flex">
                    <span>{totalCount.toLocaleString()}</span>
                    <span className="hidden md:flex">{unit}</span>
                </div>

                <span className="hidden md:flex">중</span>
                <span className="flex md:hidden">/</span>

                <div className="flex">
                    <span>{currentCount.toLocaleString()}</span>
                    <span className="hidden md:flex">{unit}</span>
                </div>
            </div>

            {onChangePerPage && (
                <div className="flex items-center gap-2">
                    <span className="hidden md:flex">최대 표시</span>
                    <select
                        className="select select-sm select-bordered"
                        key={pagination.itemsPerPage}
                        defaultValue={pagination.itemsPerPage}
                        onChange={(e) => {
                            return onChangePerPage(parseInt(e.target.value));
                        }}
                    >
                        {[10, 30, 50, 100, 0].map((num, i) => (
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
                        <span className="hidden md:flex">이전</span>
                    </PageButton>

                    <PageButton
                        onClick={() => movePage(currentPage + 1)}
                        disabled={pagination.totalPage <= pagination.currentPage}
                    >
                        <span className="hidden md:flex">다음</span>
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
