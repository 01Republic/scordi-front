import React, {useEffect, useState} from 'react';

interface PagePerSelectProps {
    defaultValue: number; // pagination.itemsPerPage
    changePageSize: (itemsPerPage: number) => any;
    perValues?: number[];
    allowAll?: boolean;
    className?: string;
    isLoading?: boolean;
}

export function PagePerSelect(props: PagePerSelectProps) {
    const {
        defaultValue,
        isLoading = false,
        changePageSize,
        perValues = [30, 50, 100, 500],
        allowAll = false,
        className = '',
    } = props;
    const [val, setVal] = useState(defaultValue);

    useEffect(() => {
        if (!isLoading) setVal(defaultValue);
    }, [defaultValue, isLoading]);

    return (
        <select
            key={val}
            className={`select select-bordered ${className}`}
            defaultValue={val === 0 ? 0 : val}
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
}
