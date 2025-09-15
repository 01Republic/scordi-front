import {CSSProperties, useMemo, useState} from 'react';
import {
    BooleanCellColumnType,
    DateCellColumnType,
    EmailCellColumnType,
    MonoSelectCellColumnType,
    NumberCellColumnType,
    TextCellColumnType,
    UrlCellColumnType,
} from '^lib/GyuridTable';

export interface ColumnDef<T> {
    field: keyof T | string;
    headerName?: string;
    flex?: number;
    className?: string;
    width?: number;
    cellType?:
        | EmailCellColumnType
        | UrlCellColumnType
        | TextCellColumnType
        | NumberCellColumnType
        | DateCellColumnType
        | BooleanCellColumnType
        | MonoSelectCellColumnType
        | {name: 'multi-select'}
        | {name: 'profile'}
        | {name: 'file'}
        | {name: 'function'}
        | {name: 'reference'};
    cellStyle?: CSSProperties;
    valueGetter?: (state: {data: T}) => any;
    onSort?: (field: string, direct: 'ASC' | 'DESC') => any;
    hide?: boolean;
}

/**
 * 테이블의 컬럼 정의 배열을 상태로 관리하는 훅을 생성합니다.
 *
 * 초기 컬럼 정의를 받아 해당 배열과 이를 갱신하는 상태 설정 함수를 반환합니다.
 *
 * @param initialColumnDefs - 초기 컬럼 정의 배열 (기본: 빈 배열)
 * @returns 컬럼 정의 배열과 이를 업데이트하는 상태 설정 함수의 튜플: `[ColumnDef<T>[], React.Dispatch<React.SetStateAction<ColumnDef<T>[]>>]`
 */
export function useColumnDefs<T>(initialColumnDefs: ColumnDef<T>[] = []) {
    return useState<ColumnDef<T>[]>(initialColumnDefs);
}

export interface DefaultColDef<T> extends Omit<Partial<ColumnDef<T>>, 'onSort'> {}

/**
 * 기본 컬럼 정의 객체를 주어진 의존성 배열에 따라 메모이제이션하여 반환합니다.
 *
 * 주로 테이블의 기본 컬럼 설정을 한 번 생성해 재사용할 때 사용합니다.
 *
 * @param initialColumnDef - 반환할 기본 컬럼 정의의 초기 값(부분적 정의 가능)
 * @param deps - 메모이제이션을 갱신할 의존성 배열(React useMemo와 동일한 의미)
 * @returns 의존성 배열을 기준으로 메모이제이션된 `Partial<ColumnDef<T>>`
 */
export function useDefaultColDef<T>(initialColumnDef: Partial<ColumnDef<T>> = {}, deps: any[] = []) {
    return useMemo<Partial<ColumnDef<T>>>(() => {
        return initialColumnDef;
    }, deps);
}
