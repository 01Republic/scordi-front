import {SetterOrUpdater} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';

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
