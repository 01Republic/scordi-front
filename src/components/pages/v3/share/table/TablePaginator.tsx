import {memo} from 'react';
import {PaginationMetaData} from '^types/utils/paginated.dto';

interface TablePaginatorProps {
    pagination: PaginationMetaData;
    onPrev?: (prevPageNum: number) => any;
    onNext?: (nextPageNum: number) => any;
    movePage?: (targetPageNum: number) => any;
}

export const TablePaginator = memo((props: TablePaginatorProps) => {
    const {pagination, movePage, onPrev, onNext} = props;
    const {currentPage, totalPage, totalItemCount} = pagination;

    const twoDigitIndex = Math.ceil(currentPage / 10) * 10;
    const startPageNum = twoDigitIndex - 9;
    const endPageNum = totalPage > twoDigitIndex ? twoDigitIndex : totalPage;
    const pageList = Array.from({length: endPageNum - startPageNum + 1}, (v, i) => startPageNum + i);

    const prevPageNum = currentPage > 1 ? currentPage - 1 : NaN;
    const nextPageNum = currentPage < totalPage ? currentPage + 1 : NaN;
    const getPrevPage = () => onPrev && onPrev(prevPageNum);
    const getNextPage = () => onNext && onNext(nextPageNum);

    return (
        <div className="btn-group">
            <button className="btn btn-ghost" onClick={getPrevPage} disabled={isNaN(prevPageNum)}>
                «
            </button>
            {pageList.map((pageNum, i) => {
                return (
                    <button
                        key={i}
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
