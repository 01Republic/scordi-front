import React, {memo, useEffect, useState} from 'react';
import {FaPlus} from 'react-icons/fa6';
import {useRecoilValue} from 'recoil';
import {teamIdParamState} from '^atoms/common';
import {useCurrentTeam, useTeamsSubscriptionForDetailPage} from '^models/Team/hook';
import {LinkTo} from '^components/util/LinkTo';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {TeamSubscriptionsBox} from '^clients/private/orgs/team/teams/TeamDetailPage/Subscriptions/TeamSubscriptionsBox';

export const TeamSubscriptionsListPage = memo(function TeamSubscriptionsListPage() {
    const teamId = useRecoilValue(teamIdParamState);
    const {team, reload} = useCurrentTeam();
    const {search, result, isLoading, isNotLoaded, isEmptyResult, orderBy, movePage, changePageSize} =
        useTeamsSubscriptionForDetailPage();

    const onSearch = (keyword?: string) => {
        search({
            keyword,
            relations: ['teamMember', 'teamMember.teams', 'subscription', 'teamMember.subscriptionCount'],
        });
    };

    useEffect(() => {
        !!teamId && search({where: {}, relations: ['teamMember', 'teamMember.teams', 'subscription']});
    }, [teamId]);

    console.log(result);

    return (
        <>
            <div className={'flex items-center justify-between pb-4'}>
                <div>
                    이용중인 구독 수 <span className={'text-scordi-500'}>{team?.subscriptionCount}</span>
                </div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                </div>
            </div>
            <TeamSubscriptionsBox result={result} reload={reload} />
        </>
    );
});
