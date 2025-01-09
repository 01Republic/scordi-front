import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {toast} from 'react-hot-toast';
import {FaPlus} from 'react-icons/fa6';
import {orgIdParamState} from '^atoms/common';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer, ListTablePaginator} from '^clients/private/_components/table/ListTable';
import {LinkTo} from '^components/util/LinkTo';
import {confirm2, confirmed} from '^components/util/dialog';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {subscriptionApi} from '^models/Subscription/api';
import {SubscriptionDto} from '^models/Subscription/types';
import {SubscriptionScopeHandler} from './SubscriptionScopeHandler';
import {SubscriptionTableHeader} from './SubscriptionTableHeader';
import {SubscriptionTableRow} from './SubscriptionTableRow';
import {ExcelDownLoadButton} from './ExcelDownLoadButton';
import {CurrencyToggle} from '^tasting/CurrencyToggle';
import {errorToast} from '^api/api';

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
        <div>
            <LinkTo
                href={OrgSubscriptionSelectPageRoute.path(orgId)}
                className="btn btn-scordi gap-2 no-animation btn-animation"
                loadingOnBtn
            >
                <FaPlus />
                <span>구독 추가</span>
            </LinkTo>
        </div>
    );

    const onDelete = (subscription: SubscriptionDto) => {
        const deleteConfirm = () => {
            return confirm2(
                '구독을 삭제할까요?',
                <div className="text-16">
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                    그래도 삭제하시겠어요?
                </div>,
                'warning',
            );
        };

        confirmed(deleteConfirm(), '삭제 취소')
            .then(() => subscriptionApi.destroy(subscription.id))
            .then(() => toast.success('구독을 삭제했어요.'))
            .then(() => reload())
            .catch(errorToast);
    };

    return (
        <ListPage
            onReady={onReady}
            breadcrumb={['구독', {text: '구독 리스트', active: true}]}
            titleText="구독 리스트"
            Buttons={() => (
                <div className="flex gap-4">
                    <ExcelDownLoadButton />
                    <AddSubscriptionButton />
                </div>
            )}
            ScopeHandler={SubscriptionScopeHandler}
            onSearch={onSearch}
            // searchInputPosition="start-of-buttons"
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
                hideTopPaginator
            >
                <div className="flex items-center justify-between mb-4">
                    <div>
                        {/*<CurrencyToggle leftText={''} rightText={'원화로 보기'} className={'font-medium'} />*/}
                    </div>
                    <ListTablePaginator
                        pagination={result.pagination}
                        movePage={movePage}
                        onChangePerPage={changePageSize}
                        unit="개"
                    />
                </div>

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
