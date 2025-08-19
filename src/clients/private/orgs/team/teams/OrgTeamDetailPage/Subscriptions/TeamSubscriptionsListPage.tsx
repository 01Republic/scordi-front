import React, {memo} from 'react';
import {debounce} from 'lodash';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useCurrentTeam} from '^models/Team/hook';
import {useTeamSubscriptions2} from '^models/Subscription/hook';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {TeamSubscriptionCard} from './TeamSubscriptionCard';
import {LoadableBox} from '^components/util/loading';
import {OrgTeamDetailPageTabContentCommonProps} from '../OrgTeamDetailPageTabContent';

export const TeamSubscriptionsListPage = memo(function (props: OrgTeamDetailPageTabContentCommonProps) {
    const {reload: reloadParent} = props;
    const {team} = useCurrentTeam();
    const orgId = useOrgIdParam();
    const teamId = useIdParam('teamId');

    const {search, result, isLoading} = useTeamSubscriptions2(orgId, teamId, {
        relations: ['product', 'teamMembers'],
        itemsPerPage: 0,
    });

    const onSearch = debounce((keyword?: string) => {
        return search({
            relations: ['product', 'teamMembers'],
            itemsPerPage: 0,
            keyword,
        });
    }, 500);

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
