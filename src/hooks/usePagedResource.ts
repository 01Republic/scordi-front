import {RecoilState, SetterOrUpdater, useRecoilState, useRecoilValue} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {orgIdParamState} from '^atoms/common';
import {AxiosResponse} from 'axios';

// export function usePagedResource<DTO, Query>(
//     resultAtom: RecoilState<Paginated<DTO>>,
//     queryAtom: RecoilState<Query>,
//     mergeMode = false,
// ) {
//     const defaultMergeMode = mergeMode;
//     const orgId = useRecoilValue(orgIdParamState);
//     const [result, setResult] = useRecoilState(resultAtom);
//     const [query, setQuery] = useRecoilState(queryAtom);
// }

export function cachePagedQuery<T, Q extends any>(
    setResult: SetterOrUpdater<Paginated<T>>,
    setQuery: SetterOrUpdater<Q>,
    params: Q,
    request: () => Promise<AxiosResponse<Paginated<T>>>,
    mergeMode: boolean,
    force: boolean,
) {
    setQuery((oldQuery) => {
        if (!force && JSON.stringify(oldQuery) === JSON.stringify(params)) return oldQuery;

        const req = request().then((res) => res.data);
        req.then((data) => {
            if (mergeMode) {
                setResult((oldResult) => {
                    const items = [...oldResult.items, ...data.items];
                    const pagination = data.pagination;
                    pagination.currentItemCount = items.length;
                    return {items, pagination};
                });
            } else {
                setResult(data);
            }
        });

        return params;
    });
}

export function makeAppendPagedItemFn<T>(setResult: SetterOrUpdater<Paginated<T>>) {
    return (list: T[]) => {
        setResult((oldResult) => {
            const items = [...list, ...oldResult.items];
            const pagination = {...oldResult.pagination};
            const diff = list.length;
            pagination.currentItemCount += diff;
            pagination.totalItemCount += diff;
            return {items, pagination};
        });
    };
}

export function makeExceptPagedItemFn<T>(
    setResult: SetterOrUpdater<Paginated<T>>,
    filterFn: (it: T, item: T) => boolean,
) {
    return (item: T) => {
        setResult((oldResult) => {
            const items = oldResult.items.filter((it) => filterFn(it, item));
            const pagination = {...oldResult.pagination};
            const diff = oldResult.pagination.currentItemCount - items.length;
            pagination.currentItemCount -= diff;
            pagination.totalItemCount -= diff;
            return {items, pagination};
        });
    };
}
