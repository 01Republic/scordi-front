import React, {memo, useEffect} from 'react';
import {useCurrentTeam, useCurrentTeam2} from '^models/Team/hook';
import {TabName} from './OrgTeamDetailPageTabContent';
import {TeamStatCard} from './TeamStatCard';
import {useUnmount} from '^hooks/useUnmount';
import {debounce} from 'lodash';
import {CreditCard, LayoutGrid, Receipt, RotateCw, Users} from 'lucide-react';
import {teamIdParamState, useOrgIdParam} from '^atoms/common';
import {useRecoilState, useRecoilValue} from 'recoil';

interface TeamStatCardListProps {
    changeCurrentTab?: (tabName: TabName) => any;
}

export const TeamStatCardList = memo((props: TeamStatCardListProps) => {
    const {changeCurrentTab} = props;
    const orgId = useOrgIdParam();
    const teamId = useRecoilValue(teamIdParamState);

    const {team, reloadWithUpdateCounters, isLoading} = useCurrentTeam();
    const {data: currentTeamData} = useCurrentTeam2(orgId, teamId);

    const updateCounter = () => currentTeamData && reloadWithUpdateCounters();
    return (
        <div className="bg-slate-100 rounded-lg p-2 shadow-lg">
            <div className="flex items-center justify-between mb-3">
                <p className="text-12 text-gray-400">이 팀에 연결된 항목</p>

                <RotateCw
                    className={`text-12 text-gray-400 hover:text-black transition cursor-pointer ${
                        isLoading ? 'animate-spin' : ''
                    }`}
                    onClick={updateCounter}
                />
            </div>

            <div className="grid grid-cols-2 gap-1">
                <TeamStatCard
                    Icon={() => <Users fontSize={15} className="text-yellow-600" />}
                    title="구성원"
                    count={currentTeamData ? currentTeamData.teamMemberCount : 0}
                    className={`text-gray-500 ${isLoading ? 'animate-pulse' : ''}`}
                    onClick={() => changeCurrentTab && changeCurrentTab(TabName.members)}
                    isLoading={isLoading}
                />
                <TeamStatCard
                    Icon={() => <LayoutGrid fontSize={13} className="text-scordi-500" />}
                    title="구독"
                    count={currentTeamData ? currentTeamData.subscriptionCount : 0}
                    className={`text-gray-500 ${isLoading ? 'animate-pulse' : ''}`}
                    onClick={() => changeCurrentTab && changeCurrentTab(TabName.subscriptions)}
                    isLoading={isLoading}
                />
                <TeamStatCard
                    Icon={() => <CreditCard fontSize={14} className="text-green-600" />}
                    title="결제수단"
                    count={currentTeamData ? currentTeamData.creditCardCount : 0}
                    className={`text-gray-500 ${isLoading ? 'animate-pulse' : ''}`}
                    onClick={() => changeCurrentTab && changeCurrentTab(TabName.payments)}
                    isLoading={isLoading}
                />
                <TeamStatCard
                    Icon={() => <Receipt fontSize={14} className="text-blue-600" />}
                    title="청구서"
                    count={currentTeamData ? currentTeamData.invoiceAccountCount : 0}
                    className={`text-gray-500 ${isLoading ? 'animate-pulse' : ''}`}
                    onClick={() => changeCurrentTab && changeCurrentTab(TabName.invoices)}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
});
