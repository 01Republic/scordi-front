import React, {memo} from 'react';
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

interface PaginatorProps {
    className?: string;
    currentPage: number;
    totalPage: number;
    onClick: (pageNum: number) => any;
}

export const Paginator = memo((props: PaginatorProps) => {
    const {className = '', currentPage, totalPage, onClick} = props;

    const twoDigitIndex = Math.ceil(currentPage / 10) * 10;
    const startPageNum = twoDigitIndex - 9;
    const endPageNum = totalPage > twoDigitIndex ? twoDigitIndex : totalPage;
    const pageList = Array.from({length: endPageNum - startPageNum + 1}, (v, i) => startPageNum + i);

    return (
        <div className={`btn-group ${className}`}>
            <button className="btn" onClick={() => currentPage !== 1 && onClick(1)}>
                <MdKeyboardDoubleArrowLeft />
            </button>
            <button className="btn" onClick={() => currentPage !== 1 && onClick(currentPage - 1)}>
                <MdKeyboardArrowLeft />
            </button>

            {pageList.map((pageNum, i) => (
                <button
                    key={i}
                    className={`btn ${pageNum === currentPage && 'btn-active'}`}
                    onClick={() => onClick(pageNum)}
                >
                    {pageNum}
                </button>
            ))}

            <button className="btn" onClick={() => currentPage !== totalPage && onClick(currentPage + 1)}>
                <MdKeyboardArrowRight />
            </button>
            <button className="btn" onClick={() => currentPage !== totalPage && onClick(totalPage)}>
                <MdKeyboardDoubleArrowRight />
            </button>
        </div>
    );
});

interface PagePerSelectProps {
    defaultValue: number; // pagination.itemsPerPage
    changePageSize: (itemsPerPage: number) => any;
    perValues?: number[];
    allowAll?: boolean;
    className?: string;
}

export const PagePerSelect = memo((props: PagePerSelectProps) => {
    const {defaultValue, changePageSize, perValues = [10, 30, 50, 100], allowAll = false, className = ''} = props;

    return (
        <select
            className={`select select-bordered ${className}`}
            defaultValue={defaultValue === 0 ? 0 : defaultValue}
            onChange={(e) => changePageSize(Number(e.target.value))}
        >
            {perValues.map((value, i) => (
                <option key={i} value={value}>
                    {value} 개씩 보기
                </option>
            ))}
            {allowAll && <option value={0}>전체 보기</option>}
        </select>
    );
});
PagePerSelect.displayName = 'PagePerSelect';
