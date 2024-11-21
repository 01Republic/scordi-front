import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import React, {memo, useEffect, useState} from 'react';
import {useTeamCreditCardListInTeamDetail} from '^models/TeamCreditCard/hook';
import {useRecoilValue} from 'recoil';
import {teamIdParamState} from '^atoms/common';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {AddPaymentModal} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/Payments/AddPaymentModal';
import {TeamPaymentTableHeader} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/Payments/TeamPaymentTableHeader';
import {TeamPaymentTableRow} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/Payments/TeamPaymentTableRow';
import {FaPlus} from 'react-icons/fa6';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {useRouter} from 'next/router';
import {OrgTeamDetailPageTabContentCommonProps} from '../OrgTeamDetailPageTabContent';

export const TeamPaymentsListPage = memo(function (props: OrgTeamDetailPageTabContentCommonProps) {
    const router = useRouter();
    const teamId = useRecoilValue(teamIdParamState);
    const {
        search,
        result,
        reload,
        isLoading,
        isNotLoaded,
        isEmptyResult,
        orderBy,
        movePage,
        changePageSize,
        clearCache,
    } = useTeamCreditCardListInTeamDetail();
    const [isOpened, setIsOpened] = useState(false);

    const onSearch = (keyword?: string) => {
        search({keyword, where: {teamId: teamId}, relations: ['creditCard', 'creditCard.holdingMember']});
    };

    useEffect(() => {
        !!teamId && search({where: {teamId: teamId}, relations: ['creditCard', 'creditCard.holdingMember']});
    }, [teamId]);

    useEffect(() => {
        return () => clearCache();
    }, [router.isReady]);

    return (
        <>
            <div className={'flex items-center justify-between pb-4'}>
                <div>
                    전체 <span className={'text-scordi-500'}>{result.pagination.totalItemCount}</span>
                </div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                    <button
                        className="btn btn-square btn-scordi animate-none btn-animation"
                        onClick={() => setIsOpened(true)}
                    >
                        <FaPlus fontSize={20} />
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

            <AddPaymentModal
                preItems={result.items}
                isOpened={isOpened}
                onClose={() => {
                    reload();
                    setIsOpened(false);
                }}
            />
        </>
    );
});
