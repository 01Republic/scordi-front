import {memo, useState} from 'react';
import {SubscriptionTr} from './SubscriptionTr';
import {SubscriptionDto} from '^models/Subscription/types';
import {WithChildren} from '^types/global.type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import Qs from 'qs';
import {TiArrowSortedDown, TiArrowSortedUp} from 'react-icons/ti';

interface PagedTableProps<T> {
    items: T[];
    reload?: () => any;
    search?: (params: FindAllQueryDto<T>, mergeMode?: boolean, force?: boolean) => Promise<any>;
    query?: FindAllQueryDto<T>;
}

export const SubscriptionTable = memo(function SubscriptionTable(props: PagedTableProps<SubscriptionDto>) {
    const {reload, items: subscriptions, search, query} = props;

    const onSort = (sortKey: string, value: 'ASC' | 'DESC') => {
        if (!query || !search) return;

        const newOrder = Qs.parse(`${sortKey}=${value}`);
        const searchQuery: FindAllQueryDto<SubscriptionDto> = {...query, page: 1};
        // searchQuery.order = {...(searchQuery.order || {}), ...newOrder};
        searchQuery.order = newOrder;
        search(searchQuery);
    };

    const sort = search && onSort;

    return (
        <div className="card bg-white shadow">
            <div className="overflow-x-auto overflow-y-hidden w-full">
                <table className="table w-full">
                    <thead className="top-[50px]">
                        <tr className="text-gray-500">
                            {/* Checkbox */}
                            {/*<th className="bg-transparent"></th>*/}
                            <SortableTH sortKey="[product][nameKo]" onClick={sort}>
                                서비스 명
                            </SortableTH>

                            <SortableTH>
                                <span className="pl-[8px]">유/무료</span>
                            </SortableTH>

                            {/* [구독상태] subscription.status: SubscriptionStatus */}
                            {/*<SortableTH sortKey="[status]" onClick={sort}>*/}
                            {/*    <span className="pl-[8px]">상태</span>*/}
                            {/*</SortableTH>*/}

                            {/* [결제주기] subscription.billingCycleType: BillingCycleOptions */}
                            <SortableTH className="">
                                <span className="pl-[8px]">결제주기</span>
                            </SortableTH>

                            {/* [과금방식] subscription.recurringType: RecurringTypeOptions */}
                            <SortableTH className="">
                                <span className="pl-[8px]">과금방식</span>
                            </SortableTH>

                            <SortableTH className="">결제수단</SortableTH>

                            <SortableTH onClick={sort} className="text-right">
                                사용인원
                            </SortableTH>

                            <SortableTH className="text-right">최신 결제금액</SortableTH>

                            {/*<SortableTH className="text-right">다음 결제일</SortableTH>*/}

                            <SortableTH>
                                <span className="pl-[8px]">담당자</span>
                            </SortableTH>

                            {/* Actions */}
                            <th className="bg-transparent"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {subscriptions.map((subscription, i) => (
                            <SubscriptionTr key={i} subscription={subscription} reload={reload} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

interface SortableTHProps extends WithChildren {
    className?: string;
    onClick?: (sortKey: string, value: 'ASC' | 'DESC') => any;
    sortKey?: string;
    sortVal?: 'ASC' | 'DESC';
}

const SortableTH = memo((props: SortableTHProps) => {
    const {className = '', sortKey, sortVal = 'ASC', onClick, children} = props;
    const [value, setValue] = useState<boolean>();

    const isSortable = !!(sortKey && onClick);

    const sort = () => {
        if (!isSortable) return;

        onClick(sortKey, !value ? 'ASC' : 'DESC');
        setValue((v) => !v);
    };

    return (
        <th onClick={sort} className={`cursor-pointer bg-transparent ${className}`}>
            {isSortable ? (
                <div className={`flex items-center ${className}`}>
                    {children} {typeof value === 'boolean' && value ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                </div>
            ) : (
                children
            )}
        </th>
    );
});
