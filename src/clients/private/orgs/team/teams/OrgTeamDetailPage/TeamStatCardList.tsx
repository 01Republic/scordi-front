import React, {memo, useEffect} from 'react';
import {useCurrentTeam, useCurrentTeam2} from '^models/Team/hook';
import {TabName} from './OrgTeamDetailPageTabContent';
import {TeamStatCard} from './TeamStatCard';
import {useUnmount} from '^hooks/useUnmount';
import {debounce} from 'lodash';
import {CircleDollarSign, CreditCard, LayoutGrid, Receipt, ReceiptText, RotateCw, Users} from 'lucide-react';
import {teamIdParamState, useIdParam, useOrgIdParam} from '^atoms/common';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useQueryClient} from '@tanstack/react-query';
import {TEAM_HOOK_KEY} from '^models/Team/hook/key';

interface TeamStatCardListProps {
    changeCurrentTab?: (tabName: TabName) => any;
}

export const TeamStatCardList = memo((props: TeamStatCardListProps) => {
    const {changeCurrentTab} = props;
    const orgId = useOrgIdParam();
    const teamId = useIdParam('teamId');

    const queryClient = useQueryClient();
    const {team, reloadWithUpdateCounters, isLoading: isUpdateLoading} = useCurrentTeam();
    const {data: currentTeamData, isLoading: isCurrentTeamLoading} = useCurrentTeam2(orgId, teamId);

    const viewData = team ? team : currentTeamData;

    const updateCounter = () => {
        reloadWithUpdateCounters();
        queryClient.invalidateQueries({
            queryKey: [TEAM_HOOK_KEY.detail, orgId, teamId],
            exact: true,
        });
    };

    const loading = isUpdateLoading || isCurrentTeamLoading;
    return (
        <div className="bg-slate-100 rounded-lg p-2 shadow-lg">
            <div className="flex items-center justify-between mb-1.5 md:mb-3">
                <p className="text-12 text-gray-400">이 팀에 연결된 항목</p>

                <RotateCw
                    className={`text-12 text-gray-400 hover:text-black transition cursor-pointer ${
                        loading ? 'animate-spin' : ''
                    }`}
                    onClick={updateCounter}
                />
            </div>

            <div className="grid grid-cols-4 md:lg:grid-cols-2 gap-1">
                <TeamStatCard
                    Icon={() => <Users fontSize={16} className="text-pink-400 hidden xss:flex" />}
                    title="구성원"
                    count={viewData ? viewData.teamMemberCount : 0}
                    className={`text-gray-500 ${loading ? 'animate-pulse' : ''}`}
                    onClick={() => changeCurrentTab && changeCurrentTab(TabName.members)}
                    isLoading={loading}
                />
                <TeamStatCard
                    Icon={() => <LayoutGrid fontSize={16} className="text-scordi-500 hidden xss:flex" />}
                    title="구독"
                    count={viewData ? viewData.subscriptionCount : 0}
                    className={`text-gray-500 ${loading ? 'animate-pulse' : ''}`}
                    onClick={() => changeCurrentTab && changeCurrentTab(TabName.subscriptions)}
                    isLoading={loading}
                />
                <TeamStatCard
                    Icon={() => <CircleDollarSign fontSize={16} className="text-green-400 hidden xss:flex" />}
                    title="결제수단"
                    count={viewData ? viewData.creditCardCount : 0}
                    className={`text-gray-500 ${loading ? 'animate-pulse' : ''}`}
                    onClick={() => changeCurrentTab && changeCurrentTab(TabName.payments)}
                    isLoading={loading}
                />
                <TeamStatCard
                    Icon={() => <ReceiptText fontSize={16} className="text-cyan-400 hidden xss:flex -mx-[0.5px]" />}
                    title="청구서"
                    count={viewData ? viewData.invoiceAccountCount : 0}
                    className={`text-gray-500 ${loading ? 'animate-pulse' : ''}`}
                    onClick={() => changeCurrentTab && changeCurrentTab(TabName.invoices)}
                    isLoading={loading}
                />
            </div>
        </div>
    );
});
