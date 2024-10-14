import React, {memo} from 'react';
import {ListTableContainer} from '^clients/private/_components/table/ListTable';

export const BillingHistoryYearly = memo(() => {
    return (
        <ListTableContainer
            hideTopPaginator
            pagination={{
                totalItemCount: 1632,
                currentItemCount: 10,
                totalPage: 17,
                currentPage: 1,
                itemsPerPage: 10,
            }}
        ></ListTableContainer>
    );
});
