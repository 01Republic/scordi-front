import {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';

type SubscriptionTableHeaderProps = ListTableHeaderProps;

export const SubscriptionTableHeader = memo((props: SubscriptionTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            {/* Checkbox */}
            {/*<th className="bg-transparent"></th>*/}
            <SortableTH sortKey="[product][nameKo]" onClick={orderBy}>
                서비스 명
            </SortableTH>

            <SortableTH sortKey="[usedMemberCount]" sortVal="DESC" onClick={orderBy}>
                사용인원
            </SortableTH>

            <th>비고</th>
            <th></th>
        </tr>
    );
});
SubscriptionTableHeader.displayName = 'SubscriptionTableHeader';
