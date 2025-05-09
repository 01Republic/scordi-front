import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {teamIdParamState} from '^atoms/common';
import {useUnmount} from '^hooks/useUnmount';
import {useCurrentTeam} from '^models/Team/hook';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {useSubscriptionsInTeamShowPage} from '^models/Subscription/hook';
import {TeamSubscriptionCard} from './TeamSubscriptionCard';
import {LoadableBox} from '^components/util/loading';
import {debounce} from 'lodash';
import {FindAllSubscriptionsQuery} from '^models/Subscription/types';
import {OrgTeamDetailPageTabContentCommonProps} from '../OrgTeamDetailPageTabContent';

export const TeamSubscriptionsListPage = memo(function (props: OrgTeamDetailPageTabContentCommonProps) {
    const {reload: reloadParent} = props;
    const {team} = useCurrentTeam();
    const {search, result, isLoading, reset} = useSubscriptionsInTeamShowPage();

    const loadData = (teamId: number, params: FindAllSubscriptionsQuery = {}) => {
        return search({
            relations: ['product', 'teamMembers'],
            itemsPerPage: 0,
            ...params,
        });
    };

    const onSearch = debounce((keyword?: string) => {
        return team && loadData(team.id, {keyword});
    }, 500);

    useEffect(() => {
        team && loadData(team.id);
    }, [team]);

    useUnmount(() => reset());

    return (
        <>
            <div className={'flex items-center justify-between pb-4'}>
                <div>
                    전체 <span className={'text-scordi-500'}>{team?.subscriptionCount.toLocaleString()}</span>
                </div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                </div>
            </div>

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerPos="center">
                <div className="w-full">
                    <ul className="grid grid-cols-3 gap-x-2 gap-y-3">
                        {result.items.map((item) => (
                            <TeamSubscriptionCard item={item} key={item.id} />
                        ))}
                    </ul>
                </div>
            </LoadableBox>
        </>
    );
});
