import {memo} from 'react';
import {PaginationMetaData} from '^types/utils/paginated.dto';

interface TablePaginatorProps {
    pagination: PaginationMetaData;
    onPrev?: (prevPageNum: number) => any;
    onNext?: (nextPageNum: number) => any;
    movePage?: (targetPageNum: number) => any;
}

export const TablePaginator = memo((props: TablePaginatorProps) => {
    const {pagination, movePage} = props;
    const {currentPage, totalPage, totalItemCount} = pagination;
    const currentPageIndex = Math.floor(currentPage / 10);
    const pagesCount = totalPage - currentPageIndex * 10;
    const pageList = Array.from({length: pagesCount}, (v, i) => currentPageIndex * 10 + i + 1);

    const prevPageNum = currentPage > 1 ? currentPage - 1 : NaN;
    const nextPageNum = currentPage < totalPage ? currentPage + 1 : NaN;
    const getPrevPage = () => movePage && movePage(prevPageNum);
    const getNextPage = () => movePage && movePage(nextPageNum);

    return (
        <div className="btn-group">
            <button className="btn btn-ghost" onClick={getPrevPage} disabled={isNaN(prevPageNum)}>
                «
            </button>
            {pageList.map((pageNum) => {
                return (
                    <button
                        className="btn btn-ghost"
                        onClick={() => movePage && movePage(pageNum)}
                        disabled={pageNum === currentPage}
                    >
                        {pageNum}
                    </button>
                );
            })}
            <button className="btn btn-ghost" onClick={getNextPage} disabled={isNaN(nextPageNum)}>
                »
            </button>
        </div>
    );
});
