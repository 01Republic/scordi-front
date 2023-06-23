import {memo} from 'react';
import {PaginationMetaData} from '^types/utils/paginated.dto';

interface TablePaginatorProps {
    pagination: PaginationMetaData;
    onPrev?: (prevPageNum: number) => any;
    onNext?: (nextPageNum: number) => any;
}

export const TablePaginator = memo((props: TablePaginatorProps) => {
    const {pagination, onPrev, onNext} = props;
    const {currentPage, totalPage, totalItemCount} = pagination;

    const prevPageNum = currentPage > 1 ? currentPage - 1 : NaN;
    const nextPageNum = currentPage < totalPage ? currentPage + 1 : NaN;
    const getPrevPage = () => onPrev && onPrev(prevPageNum);
    const getNextPage = () => onNext && onNext(nextPageNum);

    return (
        <div className="btn-group">
            <button className="btn btn-ghost" onClick={getPrevPage} disabled={isNaN(prevPageNum)}>
                «
            </button>
            <button className="btn btn-ghost" disabled>
                {currentPage}
            </button>
            <button className="btn btn-ghost" onClick={getNextPage} disabled={isNaN(nextPageNum)}>
                »
            </button>
        </div>
    );
});
