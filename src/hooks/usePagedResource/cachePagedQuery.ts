import {SetterOrUpdater} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {AxiosResponse} from 'axios';

export function cachePagedQuery<T, Q extends any>(
    setResult: SetterOrUpdater<Paginated<T>>,
    setQuery: SetterOrUpdater<Q>,
    params: Q,
    request: () => Promise<AxiosResponse<Paginated<T>>>,
    mergeMode: boolean,
    force: boolean,
) {
    return new Promise<Paginated<T>>((resolve, reject) => {
        setQuery((oldQuery) => {
            if (!force && JSON.stringify(oldQuery) === JSON.stringify(params)) return oldQuery;

            const req = request().then((res) => res.data);
            req.catch(reject);
            req.then((data) => {
                if (mergeMode) {
                    setResult((oldResult) => {
                        const items = [...oldResult.items, ...data.items];
                        const pagination = data.pagination;
                        pagination.currentItemCount = items.length;
                        const merged = {items, pagination};
                        resolve(merged);
                        return merged;
                    });
                } else {
                    resolve(data);
                    setResult(data);
                }
            });

            return params;
        });
    });
}
