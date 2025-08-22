import {memo} from 'react';
import {ListTable} from '^_components/table/ListTable';
import {useSubscriptionListGroupedByProduct} from '../hooks/useSubscriptionList';
import {GroupedByProductTableHeader} from './GroupedByProductTableHeader';
import {GroupedByProductTableRow} from './GroupedByProductTableRow';

interface GroupedByProductTableProps {
    query: ReturnType<typeof useSubscriptionListGroupedByProduct>;
    // ch?: CheckboxHandler<SubscriptionDto>;
}

export const GroupedByProductTable = memo((props: GroupedByProductTableProps) => {
    // const {query, ch} = props;
    const {query} = props;
    const {result, isLoading, orderBy, sortVal, reload} = query;

    return (
        <ListTable
            items={result.items}
            isLoading={isLoading}
            Header={() => <GroupedByProductTableHeader orderBy={orderBy} sortVal={sortVal} />}
            Row={({item}) => <GroupedByProductTableRow key={item.id} product={item} reload={reload} />}
        />
    );
});
GroupedByProductTable.displayName = 'GroupedByProductTable';
