import {memo} from 'react';

interface PaginatorProps {
    className?: string;
    currentPage: number;
    totalPage: number;
    onClick: (pageNum: number) => any;
}

export const Paginator = memo((props: PaginatorProps) => {
    const {className = '', currentPage, totalPage, onClick} = props;

    const pageNumbers: number[] = [];
    const minNum = currentPage - 2;
    const maxNum = currentPage + 2;
    for (let num = 1; num <= totalPage; num++) {
        if (minNum <= num && num <= maxNum) {
            pageNumbers.push(num);
        }
    }

    return (
        <div className={`btn-group ${className}`}>
            <button className="btn" onClick={() => onClick(1)}>
                «
            </button>
            {pageNumbers.map((pageNum, i) => (
                <button
                    key={i}
                    className={`btn ${pageNum === currentPage && 'btn-active'}`}
                    onClick={() => onClick(pageNum)}
                >
                    {pageNum}
                </button>
            ))}
            <button className="btn" onClick={() => onClick(totalPage)}>
                »
            </button>
        </div>
    );
});
