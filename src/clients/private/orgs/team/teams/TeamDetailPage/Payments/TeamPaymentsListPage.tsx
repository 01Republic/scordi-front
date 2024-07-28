import {TeamDetailLayout} from '^clients/private/orgs/team/teams/TeamDetailPage/TeamDetailLayout';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import React, {memo, useEffect, useState} from 'react';
import {useTeamCreditCardListInTeamDetail} from '^models/TeamCreditCard/hook';
import {useRecoilValue} from 'recoil';
import {teamIdParamState} from '^atoms/common';
import {ListTable} from '^clients/private/_components/table/ListTable';
import {AddPaymentModal} from '^clients/private/orgs/team/teams/TeamDetailPage/Payments/AddPaymentModal';
import {TeamPaymentTableHeader} from '^clients/private/orgs/team/teams/TeamDetailPage/Payments/TeamPaymentTableHeader';
import {TeamPaymentTableRow} from '^clients/private/orgs/team/teams/TeamDetailPage/Payments/TeamPaymentTableRow';
import {FaPlus} from 'react-icons/fa6';

export const TeamPaymentsListPage = memo(function TeamPaymentsListPage() {
    const teamId = useRecoilValue(teamIdParamState);
    const {search, result, reload, isLoading, orderBy} = useTeamCreditCardListInTeamDetail();
    const [isOpened, setIsOpened] = useState(false);

    const onSearch = () => {
        console.log('search');
    };

    useEffect(() => {
        !!teamId && search({where: {teamId: teamId}, relations: ['creditCard', 'creditCard.holdingMember']});
    }, [teamId]);

    return (
        <TeamDetailLayout>
            <div className={'flex items-center justify-between pb-4'}>
                <div>전체 {result.pagination.totalItemCount}</div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                    <button className="btn btn-square btn-scordi mb-1" onClick={() => setIsOpened(true)}>
                        <FaPlus fontSize={20} />
                    </button>
                </div>
            </div>
            {result.items.length > 0 ? (
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <TeamPaymentTableHeader orderBy={orderBy} />}
                    Row={({item}) => <TeamPaymentTableRow creditCard={item.creditCard} reload={reload} />}
                />
            ) : (
                <div className={'text-center py-8'}>
                    <p>항목이 없습니다. 결제수단을 추가해 주세요.</p>
                </div>
            )}

            <AddPaymentModal
                preItems={result.items}
                isOpened={isOpened}
                onClose={() => {
                    reload();
                    setIsOpened(false);
                }}
            />
        </TeamDetailLayout>
    );
});
