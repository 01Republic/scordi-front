import React, {memo, useState} from 'react';
import {debounce} from 'lodash';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useCurrentTeam} from '^models/Team/hook';
import {useTeamSubscriptions2} from '^models/Subscription/hook';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {TeamSubscriptionCard} from './TeamSubscriptionCard';
import {LoadableBox} from '^components/util/loading';
import {OrgTeamDetailPageTabContentCommonProps} from '../OrgTeamDetailPageTabContent';
import {EmptyTable} from '^_components/table/EmptyTable';
import {Inbox} from 'lucide-react';
import {useRouter} from 'next/router';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {TeamSubscriptionDetailModal} from '^clients/private/orgs/team/teams/OrgTeamDetailPage/Subscriptions/teamSubscriptionDetailModal/TeamSubscriptionDetailModal';
import {SubscriptionDto} from '^models/Subscription/types';

export const TeamSubscriptionsListPage = memo(function (props: OrgTeamDetailPageTabContentCommonProps) {
    const {reload: reloadParent} = props;
    const {team} = useCurrentTeam();
    const orgId = useOrgIdParam();
    const teamId = useIdParam('teamId');
    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionDto | null>(null);

    const {search, result, isLoading} = useTeamSubscriptions2(orgId, teamId, {
        relations: ['product', 'teamMembers', 'bankAccount', 'creditCard'],
        itemsPerPage: 0,
    });

    const onSearch = debounce((keyword?: string) => {
        return search({
            relations: ['product', 'teamMembers'],
            itemsPerPage: 0,
            keyword,
        });
    }, 500);

    if (result.items.length > 0 && !isLoading) {
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
                        <ul className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-3">
                            {result.items.map((item) => (
                                <TeamSubscriptionCard
                                    item={item}
                                    key={item.id}
                                    onClick={() => setSelectedSubscription(item)}
                                />
                            ))}
                        </ul>
                    </div>
                    <TeamSubscriptionDetailModal
                        subscription={selectedSubscription}
                        onClose={() => setSelectedSubscription(null)}
                        isOpened={!!selectedSubscription}
                    />
                </LoadableBox>
            </>
        );
    } else {
        return (
            <div className={'flex items-center justify-center py-10 px-6'}>
                <div>
                    <EmptyTable
                        Icon={() => (
                            <span className="relative">
                                <Inbox className="text-slate-200" fontSize={48} />
                            </span>
                        )}
                        message="팀 구성원과 연결된 구독이 없어요."
                    />

                    {/*<div className={'text-left'}>*/}
                    {/*    <div className="">*/}
                    {/*        <div className={'text-gray-600 text-2xl font-bold mb-4'}>*/}
                    {/*            <span className="text-black">팀</span>이 쓰는 <span className="text-black">구독</span>은{' '}*/}
                    {/*            <code className="px-1.5 py-1 rounded-sm bg-red-100 text-red-600">구성원</code>을 통해*/}
                    {/*            집계해요.*/}
                    {/*        </div>*/}

                    {/*        <div className={'text-gray-400 text-xl font-semibold'}>*/}
                    {/*            <div>*/}
                    {/*                이 팀에 누가 속해 있는지 먼저 추가해두고, <br />*/}
                    {/*                구독마다 누가쓰는지 설정을 마치면 자동으로 뜰거에요.*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
});
