import React, {memo, useState} from 'react';
import {Plus} from 'lucide-react';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useTeamCreditCard} from '^models/TeamCreditCard/hook';
import {OrgTeamDetailPageTabContentCommonProps} from '../OrgTeamDetailPageTabContent';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {TeamPaymentTableRow} from './TeamPaymentTableRow';
import {TeamPaymentTableHeader} from './TeamPaymentTableHeader';
import {AddPaymentModal} from './AddPaymentModal';

export const TeamPaymentsListPage = memo(function (props: OrgTeamDetailPageTabContentCommonProps) {
    const {reload: reloadParent} = props;
    const orgId = useOrgIdParam();
    const teamId = useIdParam('teamId');

    const {search, result, reload, isLoading, isNotLoaded, isEmptyResult, orderBy, movePage, changePageSize} =
        useTeamCreditCard(orgId, teamId, {
            relations: ['creditCard', 'creditCard.holdingMember'],
            where: {teamId},
        });
    const [isOpened, setIsOpened] = useState(false);

    const onSearch = (keyword?: string) => {
        search({
            relations: ['creditCard', 'creditCard.holdingMember'],
            where: {teamId},
            keyword,
        });
    };

    const {totalItemCount} = result.pagination;

    return (
        <>
            <div className={'flex items-center justify-between pb-4'}>
                <div>
                    전체 <span className={'text-scordi-500'}>{totalItemCount.toLocaleString()}</span>
                </div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
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
                emptyMessage="연결된 결제수단이 없어요."
                emptyButtonText="결제수단 연결"
                emptyButtonOnClick={() => setIsOpened(true)}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <TeamPaymentTableHeader orderBy={orderBy} />}
                    Row={({item}) => <TeamPaymentTableRow creditCard={item.creditCard} reload={reload} />}
                />
            </ListTableContainer>

            {isOpened && (
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
            )}
        </>
    );
});
