import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'next-i18next';
import {useRecoilValue} from 'recoil';
import {teamIdParamState} from '^atoms/common';
import {useUnmount} from '^hooks/useUnmount';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {useTeamCreditCardListInTeamDetail} from '^models/TeamCreditCard/hook';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {OrgTeamDetailPageTabContentCommonProps} from '../OrgTeamDetailPageTabContent';
import {AddPaymentModal} from './AddPaymentModal';
import {TeamPaymentTableRow} from './TeamPaymentTableRow';
import {TeamPaymentTableHeader} from './TeamPaymentTableHeader';
import {Plus} from 'lucide-react';

export const TeamPaymentsListPage = memo(function (props: OrgTeamDetailPageTabContentCommonProps) {
    const {t} = useTranslation('teams');
    const {t: tCommon} = useTranslation('common');
    const {reload: reloadParent} = props;
    const teamId = useRecoilValue(teamIdParamState);
    const {search, result, reload, isLoading, isNotLoaded, isEmptyResult, orderBy, movePage, changePageSize, reset} =
        useTeamCreditCardListInTeamDetail();
    const [isOpened, setIsOpened] = useState(false);

    const onSearch = (keyword?: string) => {
        search({
            relations: ['creditCard', 'creditCard.holdingMember'],
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
                emptyMessage={t('payments.empty') as string}
                emptyButtonText={t('payments.addPayment') as string}
                emptyButtonOnClick={() => setIsOpened(true)}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <TeamPaymentTableHeader orderBy={orderBy} />}
                    Row={({item}) => <TeamPaymentTableRow creditCard={item.creditCard} reload={reload} />}
                />
            </ListTableContainer>

            <AddPaymentModal
                teamCreditCard={result.items}
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
