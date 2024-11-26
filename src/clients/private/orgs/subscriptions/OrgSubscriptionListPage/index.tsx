import React, {memo} from 'react';
import {selectorFamily, useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {SubscriptionTableHeader} from './SubscriptionTableHeader';
import {SubscriptionTableRow} from './SubscriptionTableRow';
import {debounce} from 'lodash';
import {LinkTo} from '^components/util/LinkTo';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {FaPlus} from 'react-icons/fa6';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {confirm2} from '^components/util/dialog';
import {subscriptionApi} from '^models/Subscription/api';
import {toast} from 'react-hot-toast';
import {SubscriptionDto} from '^models/Subscription/types';
import {errorNotify} from '^utils/toast-notify';

export const OrgSubscriptionListPage = memo(function OrgSubscriptionListPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, query, isLoading, isNotLoaded, isEmptyResult, movePage, changePageSize, orderBy, reload} =
        useSubscriptionTableListAtom();

    const onReady = () => {
        search({
            where: {organizationId: orgId},
            relations: ['master', 'teamMembers', 'creditCard'],
            order: {currentBillingAmount: {dollarPrice: 'DESC'}, isFreeTier: 'ASC', id: 'DESC'},
        });
    };

    const onSearch = debounce((keyword?: string) => {
        return search({
            ...query,
            keyword: keyword || undefined,
            page: 1,
            itemsPerPage: 30,
        });
    }, 500);

    const AddSubscriptionButton = () => (
        <LinkTo href={OrgSubscriptionSelectPageRoute.path(orgId)} className="btn btn-scordi gap-2" loadingOnBtn>
            <FaPlus />
            <span>새 구독 등록</span>
        </LinkTo>
    );

    const onDelete = async (subscription: SubscriptionDto) => {
        const isConfirmed = await confirm2(
            '이 구독을 삭제할까요?',
            <div className="text-16">
                이 작업은 취소할 수 없습니다.
                <br />
                <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                그래도 삭제하시겠어요?
            </div>,
            'warning',
        ).then((res) => res.isConfirmed);
        if (!isConfirmed) return;
        await subscriptionApi.destroy(subscription.id);
        toast.success('구독을 삭제했어요');
        reload();
    };

    return (
        <ListPage
            onReady={onReady}
            breadcrumb={['구독', {text: '구독 리스트', active: true}]}
            titleText="구독 리스트"
            Buttons={() => <AddSubscriptionButton />}
            ScopeHandler={undefined}
            onSearch={onSearch}
            searchInputPosition="start-of-buttons"
        >
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
                isLoading={isLoading}
                isNotLoaded={isNotLoaded}
                isEmptyResult={isEmptyResult}
                emptyMessage="조회된 구독이 없어요."
                EmptyButtons={AddSubscriptionButton}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <SubscriptionTableHeader orderBy={orderBy} />}
                    Row={({item}) => <SubscriptionTableRow subscription={item} reload={reload} onDelete={onDelete} />}
                />
            </ListTableContainer>
        </ListPage>
    );
});

// export const fetchSubscriptionQueryById = selectorFamily({
//     key: 'fetchSubscriptionQueryById',
//     get: (id: number) => async () => {
//         try {
//             const res = await subscriptionApi.show(id);
//             return res.data;
//         } catch (e) {
//             errorNotify(e);
//         }
//     },
// });
