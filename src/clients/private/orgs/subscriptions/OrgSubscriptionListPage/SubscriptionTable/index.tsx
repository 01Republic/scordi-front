import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {useSubscriptionList} from '../hooks/useSubscriptionList';
import {ListTable} from '^_components/table/ListTable';
import {SubscriptionTableHeader} from './SubscriptionTableHeader';
import {SubscriptionTableRow} from './SubscriptionTableRow';
import {checkedSubscriptionList} from '../atom';

interface SubscriptionTableProps {
    query: ReturnType<typeof useSubscriptionList>;
}

export const SubscriptionTable = memo((props: SubscriptionTableProps) => {
    const {query} = props;
    const [checkedItems, setCheckedItems] = useRecoilState(checkedSubscriptionList);

    return (
        <ListTable
            items={query.result.items}
            isLoading={query.isLoading}
            Header={() => <SubscriptionTableHeader orderBy={query.orderBy} sortVal={query.sortVal} />}
            Row={({item}) => (
                <SubscriptionTableRow
                    subscription={item}
                    reload={query.reload}
                    isChecked={checkedItems.map((i) => i.id).includes(item.id)}
                    onCheck={(checked) => {
                        checked
                            ? setCheckedItems([...checkedItems, item])
                            : setCheckedItems((prev) => prev.filter((i) => i.id !== item.id));
                    }}
                />
            )}
        />
    );
});
SubscriptionTable.displayName = 'SubscriptionTable';
