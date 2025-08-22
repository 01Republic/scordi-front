import React, {memo, useEffect, useState} from 'react';

import {Plus} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {useOrgIdParam} from '^atoms/common';
import {errorToast} from '^api/api';
import {OrgSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/subscriptions/connection';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer, ListTablePaginator} from '^clients/private/_components/table/ListTable';
import {StepbyTutorialButton, StepByTutorialSubscriptionList} from '^components/ExternalCDNScripts/step-by';
import {LinkTo} from '^components/util/LinkTo';
import {confirm2, confirmed} from '^components/util/dialog';
import {useRemoveSubscription} from '^models/Subscription/hook';
import {SubscriptionDto} from '^models/Subscription/types';
import {useOrgSubscriptionList} from './hooks/useSubscriptionList';
import {SubscriptionScopeHandler} from './SubscriptionScopeHandler';
import {SubscriptionTableHeader} from './SubscriptionTableHeader';
import {SubscriptionTableRow} from './SubscriptionTableRow';
import {ExcelDownLoadButton} from './ExcelDownLoadButton';
import {useCheckboxHandler} from '^hooks/useCheckboxHandler';
import {BottomActionBar} from './SubscriptionTableRow/BottomAction/BottomActionBar';
import {ViewModeSwitch} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage/ViewModeSwitch';
import {SubscriptionGroupingTableRow} from 'src/clients/private/orgs/subscriptions/OrgSubscriptionListPage/subscriptionGroupingTable';
import {SubscriptionGroupingTableHeader} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage/subscriptionGroupingTable/SubscriptionGroupingTableHeader';

export const OrgSubscriptionListPage = memo(function OrgSubscriptionListPage() {
    const orgId = useOrgIdParam();
    const [isGroupMode, setIsGroupMode] = useState(true);

    const {
        mode,
        result,
        query,
        search,
        scopeSearch,
        isLoading,
        reload,
        isNotLoaded,
        isEmptyResult,
        movePage,
        changePageSize,
        orderBy,
        sortVal,
    } = useOrgSubscriptionList(
        isGroupMode,
        {
            where: {organizationId: orgId},
            relations: ['master', 'teamMembers', 'creditCard', 'bankAccount'],
            order: {
                currentBillingAmount: {dollarPrice: 'DESC'},
                isFreeTier: 'ASC',
                id: 'DESC',
                product: {nameKo: 'ASC'},
            },
        },
        {
            organizationId: orgId,
            relations: ['subscriptions', 'subscriptions.creditCard', 'subscriptions.bankAccount'],
            order: {
                subscriptions: {currentBillingAmount: {dollarPrice: 'DESC'}, isFreeTier: 'ASC', id: 'DESC'},
                nameKo: 'ASC',
            },
        },
    );

    const [openProductIds, setOpenProductIds] = useState<number[]>(result.items.map((item) => item.id));
    const {mutate: deleteSubscription} = useRemoveSubscription();
    const ch = useCheckboxHandler<SubscriptionDto>([], (item) => item.id);

    const onSearch = (keyword?: string) => {
        return search({
            // ...query,
            keyword: keyword || undefined,
            page: 1,
            itemsPerPage: 30,
        });
    };

    useEffect(() => {
        if (result.items.length > 0) {
            setOpenProductIds(result.items.map((item) => item.id));
        }
    }, [result.items]);

    const AddSubscriptionButton = () => (
        <div>
            <LinkTo
                href={OrgSubscriptionConnectionPageRoute.path(orgId)}
                className="gap-2 btn btn-scordi no-animation btn-animation"
                loadingOnBtn
            >
                <Plus />
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
            .then(() => deleteSubscription(subscription.id))
            .then(() => toast.success('구독을 삭제했어요.'))
            // .then(() => reload())
            .catch(errorToast);
    };

    return (
        <ListPage
            breadcrumb={['구독', {text: '구독 리스트', active: true}]}
            titleText="구독 리스트"
            Buttons={() => (
                <div className="flex gap-4">
                    <StepbyTutorialButton onClick={StepByTutorialSubscriptionList} />
                    <ExcelDownLoadButton />
                    <AddSubscriptionButton />
                </div>
            )}
            ScopeHandler={<SubscriptionScopeHandler onSearch={scopeSearch} />}
            onSearch={onSearch}
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
                <div className="flex justify-between items-center mb-4">
                    <div>
                        {/*<CurrencyToggle leftText={''} rightText={'원화로 보기'} className={'font-medium'} />*/}
                        <ViewModeSwitch value={isGroupMode} onChange={setIsGroupMode} />
                    </div>
                    <ListTablePaginator
                        pagination={result.pagination}
                        movePage={movePage}
                        onChangePerPage={changePageSize}
                        unit="개"
                    />
                </div>
                {mode === 'group' ? (
                    <ListTable
                        items={result.items}
                        isLoading={isLoading}
                        Header={() => <SubscriptionGroupingTableHeader orderBy={orderBy} sortVal={sortVal} />}
                        Row={({item}) => (
                            <SubscriptionGroupingTableRow
                                key={item.id}
                                product={item}
                                reload={reload}
                                onDelete={onDelete}
                                ch={ch}
                                isOpen={openProductIds.includes(item.id)}
                                toggleOpen={(id: number) => {
                                    setOpenProductIds((prev) =>
                                        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
                                    );
                                }}
                            />
                        )}
                    />
                ) : (
                    <ListTable
                        items={result.items}
                        isLoading={isLoading}
                        Header={() => <SubscriptionTableHeader orderBy={orderBy} sortVal={sortVal} />}
                        Row={({item}) => (
                            <SubscriptionTableRow
                                subscription={item}
                                reload={reload}
                                onDelete={onDelete}
                                isChecked={ch.isChecked(item)}
                                onCheck={(checked) => ch.checkOne(item, checked)}
                            />
                        )}
                    />
                )}

                {ch.checkedItems.length > 0 && (
                    <div className="fixed inset-x-0 bottom-5 z-40 flex justify-center pointer-events-none">
                        <div className="container px-4 pointer-events-auto">
                            <BottomActionBar items={ch} onClear={() => ch.checkAll(false)} />
                        </div>
                    </div>
                )}
            </ListTableContainer>
        </ListPage>
    );
});
