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
    onSort?: (direct: 'ASC' | 'DESC') => any;
}

export function useColumnDefs<T>(initialColumnDefs: ColumnDef<T>[] = []) {
    return useState<ColumnDef<T>[]>(initialColumnDefs);
}

export interface DefaultColDef<T> extends Omit<Partial<ColumnDef<T>>, 'onSort'> {}

export function useDefaultColDef<T>(initialColumnDef: Partial<ColumnDef<T>> = {}, deps: any[] = []) {
    return useMemo<Partial<ColumnDef<T>>>(() => {
        return initialColumnDef;
    }, deps);
}
