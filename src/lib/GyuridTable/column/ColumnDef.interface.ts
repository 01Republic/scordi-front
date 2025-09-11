import {CSSProperties, useMemo, useState} from 'react';

export enum CellType {
    text = 'text', // 텍스트
    number = 'number', // 숫자
    monoSelect = 'mono-select', // 선택
    multiSelect = 'multi-select', // 다중선택
    date = 'date', // 날짜
    profile = 'profile', // 사람
    file = 'file', // 파일과 미디어
    boolean = 'boolean', // 체크박스
    function = 'function', // 수식
    reference = 'reference', // 관계형
    email = 'email', // 이메일
    url = 'url', // URL
}

export interface ColumnDef<T> {
    field?: keyof T | string;
    headerName?: string;
    flex?: number;
    width?: number;
    cellType?: CellType;
    cellStyle?: CSSProperties;
    valueGetter?: (state: {data: T}) => any;
}

export function useColumnDefs<T>(initialColumnDefs: ColumnDef<T>[] = []) {
    return useState<ColumnDef<T>[]>(initialColumnDefs);
}

export interface DefaultColDef<T> extends Partial<ColumnDef<T>> {}

export function useDefaultColDef<T>(initialColumnDef: Partial<ColumnDef<T>> = {}, deps: any[] = []) {
    return useMemo<Partial<ColumnDef<T>>>(() => {
        return initialColumnDef;
    }, deps);
}
