import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'next-i18next';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {useTeamInvoiceAccountListInTeamDetail} from '^models/TeamInvoiceAccount/hook';
import {AddInvoiceModal} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/Invoices/AddInvoiceModal';
import {orgIdParamState, teamIdParamState} from '^atoms/common';
import {useRecoilValue} from 'recoil';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {InvoicesTableHeader} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/Invoices/InvoicesTableHeader';
import {InvoicesTableRow} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/Invoices/InvoicesTableRow';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {useRouter} from 'next/router';
import {OrgTeamDetailPageTabContentCommonProps} from '../OrgTeamDetailPageTabContent';
import {useUnmount} from '^hooks/useUnmount';
import {Plus} from 'lucide-react';

export const TeamInvoicesListPage = memo(function (props: OrgTeamDetailPageTabContentCommonProps) {
    const {t} = useTranslation('teams');
    const {t: tCommon} = useTranslation('common');
    const {reload: reloadParent} = props;
    const teamId = useRecoilValue(teamIdParamState);
    const {search, result, isLoading, isNotLoaded, isEmptyResult, movePage, changePageSize, reload, orderBy, reset} =
        useTeamInvoiceAccountListInTeamDetail();
    const [isOpened, setIsOpened] = useState(false);

    const onSearch = (keyword?: string) => {
        search({
            relations: [
                'invoiceAccount',
                'invoiceAccount.holdingMember',
                'invoiceAccount.subscriptions',
                'invoiceAccount.googleTokenData',
            ],
            where: {teamId},
            keyword,
        });
    };

    useEffect(() => {
        if (!teamId || isNaN(teamId)) return;
        onSearch();
    }, [teamId]);

    useUnmount(() => reset());

    const {totalItemCount} = result.pagination;

    return (
        <>
            <div className={'flex items-center justify-between pb-4'}>
                <div>
                    {tCommon('table.total')}{' '}
                    <span className={'text-scordi-500'}>{totalItemCount.toLocaleString()}</span>
                </div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={t('list.searchPlaceholder') as string} />
                    <button
                        className="btn btn-square btn-scordi animate-none btn-animation"
                        onClick={() => setIsOpened(true)}
                    >
                        <Plus fontSize={20} />
                    </button>
                </div>
            </div>
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
                hideTopPaginator={true}
                // Empty State Props
                isNotLoaded={isNotLoaded}
                isLoading={isLoading}
                isEmptyResult={isEmptyResult}
                emptyMessage={t('invoices.empty') as string}
                emptyButtonText={t('invoices.addInvoice') as string}
                emptyButtonOnClick={() => setIsOpened(true)}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <InvoicesTableHeader orderBy={orderBy} />}
                    Row={({item}) => <InvoicesTableRow teamInvoiceAccount={item} reload={reload} />}
                />
            </ListTableContainer>

            {/* 연결 추가 모달 */}
            <AddInvoiceModal
                teamInvoiceAccount={result.items}
                isOpened={isOpened}
                onClose={() => {
                    setIsOpened(false);
                }}
                onCreate={() => {
                    setIsOpened(false);
                    reload();
                }}
            />
        </>
    );
});
