import {SetterOrUpdater} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';

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
