import React, {memo} from 'react';
import {debounce} from 'lodash';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {TableSearchControl} from '^v3/share/table/TableSearchControl';
import {SortKeysHandler} from './SortKeysHandler';
import {ViewModeHandler} from '../ViewModeHandler';

export const SubscriptionSearchControl = memo(function SubscriptionSearchControl() {
    const {result, search, movePage, query} = useSubscriptionTableListAtom();

    const onSearch = debounce((keyword: string) => {
        if (!query) return;

        const searchQuery = {
            ...query,
            keyword,
            page: 1,
        };
        if (!keyword) {
            // @ts-ignore
            delete searchQuery['keyword'];
        }

        search(searchQuery);
    }, 500);

    return (
        <TableSearchControl
            size="sm"
            totalItemCount={result.pagination.totalItemCount}
            onSearch={onSearch}
            placeholder="서비스명을 입력해보세요"
        >
            <div className="flex-1 px-4 flex gap-4 items-center justify-between">
                <div>
                    <SortKeysHandler />
                </div>
                <ViewModeHandler />
            </div>
        </TableSearchControl>
    );
});
