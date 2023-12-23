import {memo} from 'react';
import {PaginationMetaData} from '^types/utils/paginated.dto';

interface TablePaginatorProps {
    pagination: PaginationMetaData;
    movePage: (targetPageNum: number) => any;
}

export const TablePaginator = memo((props: TablePaginatorProps) => {
    const {pagination, movePage} = props;
    const {currentPage, totalPage, totalItemCount} = pagination;

    const twoDigitIndex = Math.ceil(currentPage / 10) * 10;
    const startPageNum = twoDigitIndex - 9;
    const endPageNum = totalPage > twoDigitIndex ? twoDigitIndex : totalPage;
    const pageList = Array.from({length: endPageNum - startPageNum + 1}, (v, i) => startPageNum + i);

    return (
        <div className="btn-group">
            <MovePageArrowButton text="«" targetPage={startPageNum - 1} pagination={pagination} movePage={movePage} />
            {pageList.map((pageNum, i) => (
                <button
                    key={i}
                    className="btn btn-ghost"
                    onClick={() => movePage(pageNum)}
                    disabled={pageNum === currentPage}
                >
                    {pageNum}
                </button>
            ))}
            <MovePageArrowButton text="»" targetPage={endPageNum + 1} pagination={pagination} movePage={movePage} />
        </div>
    );
});

interface MovePageArrowButtonProps {
    text: string;
    targetPage: number;
    pagination: PaginationMetaData;
    movePage: (targetPageNum: number) => any;
}

const MovePageArrowButton = memo((props: MovePageArrowButtonProps) => {
    const {text, targetPage, pagination, movePage} = props;
    const {totalPage, currentPage} = pagination;

    const isFirstPageOver = targetPage < 1;
    const isLastPageOver = totalPage < targetPage;
    const disabled = isFirstPageOver || isLastPageOver;

    if (disabled) return <></>;

    return (
        <button className="btn btn-ghost" onClick={() => movePage(targetPage)}>
            {text}
        </button>
    );
});
