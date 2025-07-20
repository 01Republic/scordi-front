import React, {memo} from 'react';
import {Plus} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {useTranslation} from 'next-i18next';
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
import {useSubscriptionList} from './hooks/useSubscriptionList';
import {SubscriptionScopeHandler} from './SubscriptionScopeHandler';
import {SubscriptionTableHeader} from './SubscriptionTableHeader';
import {SubscriptionTableRow} from './SubscriptionTableRow';
import {ExcelDownLoadButton} from './ExcelDownLoadButton';

export const OrgSubscriptionListPage = memo(function OrgSubscriptionListPage() {
    const {t} = useTranslation('subscription');
    const orgId = useOrgIdParam();
    const {result, query, search, isLoading, reload, isNotLoaded, isEmptyResult, movePage, changePageSize, orderBy} =
        useSubscriptionList({
            where: {organizationId: orgId},
            relations: ['master', 'teamMembers', 'creditCard', 'bankAccount'],
            order: {currentBillingAmount: {dollarPrice: 'DESC'}, isFreeTier: 'ASC', id: 'DESC'},
        });
    const {mutate: deleteSubscription} = useRemoveSubscription();

    const onSearch = (keyword?: string) => {
        return search({
            ...query,
            keyword: keyword || undefined,
            page: 1,
            itemsPerPage: 30,
        });
    };

    const AddSubscriptionButton = () => (
        <div>
            <LinkTo
                href={OrgSubscriptionConnectionPageRoute.path(orgId)}
                className="btn btn-scordi gap-2 no-animation btn-animation"
                loadingOnBtn
            >
                <Plus />
                <span>{t('list.addButton') as string}</span>
            </LinkTo>
        </div>
    );

    const onDelete = (subscription: SubscriptionDto) => {
        const deleteConfirm = () => {
            return confirm2(
                t('delete.confirmTitle') as string,
                <div className="text-16">
                    {(t('delete.confirmMessage') as string).split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index < (t('delete.confirmMessage') as string).split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </div>,
                'warning',
            );
        };

        confirmed(deleteConfirm(), t('delete.cancelText') as string)
            .then(() => deleteSubscription(subscription.id))
            .then(() => toast.success(t('delete.success') as string))
            .then(() => reload())
            .catch(errorToast);
    };

    return (
        <ListPage
            breadcrumb={[t('list.breadcrumb') as string, {text: t('list.breadcrumbActive') as string, active: true}]}
            titleText={t('list.title') as string}
            Buttons={() => (
                <div className="flex gap-4">
                    <StepbyTutorialButton onClick={StepByTutorialSubscriptionList} />
                    <ExcelDownLoadButton />
                    <AddSubscriptionButton />
                </div>
            )}
            ScopeHandler={<SubscriptionScopeHandler onSearch={search} />}
            onSearch={onSearch}
        >
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit={t('list.unit') as string}
                isLoading={isLoading}
                isNotLoaded={isNotLoaded}
                isEmptyResult={isEmptyResult}
                emptyMessage={t('list.emptyMessage') as string}
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
                        unit={t('list.unit') as string}
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
