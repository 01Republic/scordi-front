import React, {memo, useEffect} from 'react';
import {TeamDetailLayout} from '^clients/private/orgs/team/teams/TeamDetailPage/TeamDetailLayout';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {useRecoilValue} from 'recoil';
import {teamIdParamState} from '^atoms/common';
import {ListTable} from '^clients/private/_components/table/ListTable';
import {SubscriptionTableRow} from '^clients/private/orgs/team/teams/TeamDetailPage/Subscriptions/TeamSubscriptionTableRow';
import {SubscriptionTableHeader} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage/SubscriptionTableHeader';
import {useSubscriptionsV2} from '^models/Subscription/hook';

export const TeamSubscriptionsListPage = memo(function TeamSubscriptionsListPage() {
    const teamId = useRecoilValue(teamIdParamState);
    const {search, result, isLoading, orderBy, reload} = useSubscriptionsV2();

    const onSearch = () => {
        console.log('search');
        // TODO: 검색
    };

    useEffect(() => {
        !!teamId && search({where: {}, relations: []});
        // TODO: 팀 ID로 검색하는 로직이 필요함
    }, [teamId]);

    return (
        <TeamDetailLayout>
            <div className={'flex items-center justify-between pb-4'}>
                <div>전체 {result.pagination.totalItemCount}</div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                </div>
            </div>
            {result.items.length > 0 ? (
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <SubscriptionTableHeader orderBy={orderBy} />}
                    Row={({item}) => <SubscriptionTableRow subscription={item} reload={reload} />}
                />
            ) : (
                <div className={'text-center py-8'}>
                    <p>구독중인 항목이 없습니다. 먼저 팀 멤버를 추가해 주세요.</p>
                </div>
            )}
        </TeamDetailLayout>
    );
});
