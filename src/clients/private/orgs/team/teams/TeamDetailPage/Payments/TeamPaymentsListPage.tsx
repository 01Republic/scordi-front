import {TeamDetailLayout} from '^clients/private/orgs/team/teams/TeamDetailPage/TeamDetailLayout';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import React, {memo, useEffect, useState} from 'react';
import {useTeamCreditCardListInTeamDetail} from '^models/TeamCreditCard/hook';
import {useRecoilValue} from 'recoil';
import {teamIdParamState} from '^atoms/common';
import {TeamMembersTableHeader} from '^clients/private/orgs/team/teams/TeamDetailPage/Members/TeamMembersTableHeader';
import {TeamMembersTableRow} from '^clients/private/orgs/team/teams/TeamDetailPage/Members/TeamMembersTableRow';
import {ListTable} from '^clients/private/_components/table/ListTable';
import {AddPaymentModal} from '^clients/private/orgs/team/teams/TeamDetailPage/Payments/AddPaymentModal';
import {TeamPaymentTableHeader} from '^clients/private/orgs/team/teams/TeamDetailPage/Payments/TeamPaymentTableHeader';
import {TeamPaymentTableRow} from '^clients/private/orgs/team/teams/TeamDetailPage/Payments/TeamPaymentTableRow';

export const TeamPaymentsListPage = memo(function TeamPaymentsListPage() {
    const teamId = useRecoilValue(teamIdParamState);
    const {search, result, reload, isLoading, orderBy} = useTeamCreditCardListInTeamDetail();
    const [isOpened, setIsOpened] = useState(false);

    const onSearch = () => {
        console.log('search');
    };

    useEffect(() => {
        !!teamId && search({where: {teamId: teamId}, relations: ['creditCard']});
    }, [teamId]);

    return (
        <TeamDetailLayout>
            <div className={'flex items-center justify-between pb-4'}>
                <div>전체 {result.pagination.totalItemCount}</div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                    <button className="btn btn-scordi gap-2 mb-1" onClick={() => setIsOpened(true)}>
                        + 결제수단 등록
                    </button>
                </div>
            </div>
            <ListTable
                items={result.items}
                isLoading={isLoading}
                Header={() => <TeamPaymentTableHeader orderBy={orderBy} />}
                Row={({item}) => <TeamPaymentTableRow creditCard={item.creditCard} reload={reload} />}
            />

            <AddPaymentModal
                isOpened={isOpened}
                onClose={() => {
                    reload();
                    setIsOpened(false);
                }}
            />
        </TeamDetailLayout>
    );
});
