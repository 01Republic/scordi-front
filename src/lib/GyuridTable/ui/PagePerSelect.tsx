import React, {useEffect, useState} from 'react';

interface PagePerSelectProps {
    defaultValue: number; // pagination.itemsPerPage
    changePageSize: (itemsPerPage: number) => any;
    perValues?: number[];
    allowAll?: boolean;
    className?: string;
    isLoading?: boolean;
}

/**
 * 페이지당 표시할 항목 수를 선택하는 드롭다운 컴포넌트.
 *
 * 외부에서 전달된 기본값(defaultValue)을 내부 상태로 관리하며, isLoading이 false일 때만 외부 기본값으로 동기화합니다.
 * 선택값 변경 시 숫자형으로 변환해 changePageSize 콜백을 호출합니다.
 *
 * @param defaultValue - 초기/외부에서 제어되는 선택값(0은 '전체 보기'로 사용 가능)
 * @param changePageSize - 사용자가 선택한 페이지 크기(숫자)를 받는 콜백
 * @param perValues - 드롭다운에 표시할 페이지 크기 옵션들의 배열(기본: [30, 50, 100, 500])
 * @param allowAll - true이면 '전체 보기'(값 0) 옵션을 추가
 * @param className - 추가할 CSS 클래스
 * @param isLoading - 로딩 상태인 동안 외부 defaultValue로 내부 값을 덮어쓰지 않도록 하는 플래그
 * @returns 렌더된 select 요소(JSX.Element)
 */
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
