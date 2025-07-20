import React, {memo, useEffect} from 'react';
import {useTranslation} from 'next-i18next';
import {useCurrentTeam} from '^models/Team/hook';
import {TabName} from './OrgTeamDetailPageTabContent';
import {TeamStatCard} from './TeamStatCard';
import {useUnmount} from '^hooks/useUnmount';
import {debounce} from 'lodash';
import {CreditCard, LayoutGrid, Receipt, RotateCw, Users} from 'lucide-react';

interface TeamStatCardListProps {
    changeCurrentTab?: (tabName: TabName) => any;
}

export const TeamStatCardList = memo((props: TeamStatCardListProps) => {
    const {t} = useTranslation('teams');
    const {changeCurrentTab} = props;
    const {team, reloadWithUpdateCounters, isLoading} = useCurrentTeam();

    const updateCounter = () => team && reloadWithUpdateCounters();

    return (
        <div className="bg-slate-100 rounded-lg p-2 shadow-lg">
            <div className="flex items-center justify-between mb-3">
                <p className="text-12 text-gray-400">{t('detail.stats.title')}</p>

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
                    title={t('detail.stats.members')}
                    count={team ? team.teamMemberCount : 0}
                    className={`text-gray-500 ${isLoading ? 'animate-pulse' : ''}`}
                    onClick={() => changeCurrentTab && changeCurrentTab(TabName.members)}
                    isLoading={isLoading}
                />
                <TeamStatCard
                    Icon={() => <LayoutGrid fontSize={13} className="text-scordi-500" />}
                    title={t('detail.stats.subscriptions')}
                    count={team ? team.subscriptionCount : 0}
                    className={`text-gray-500 ${isLoading ? 'animate-pulse' : ''}`}
                    onClick={() => changeCurrentTab && changeCurrentTab(TabName.subscriptions)}
                    isLoading={isLoading}
                />
                <TeamStatCard
                    Icon={() => <CreditCard fontSize={14} className="text-green-600" />}
                    title={t('detail.stats.payments')}
                    count={team ? team.creditCardCount : 0}
                    className={`text-gray-500 ${isLoading ? 'animate-pulse' : ''}`}
                    onClick={() => changeCurrentTab && changeCurrentTab(TabName.payments)}
                    isLoading={isLoading}
                />
                <TeamStatCard
                    Icon={() => <Receipt fontSize={14} className="text-blue-600" />}
                    title={t('detail.stats.invoices')}
                    count={team ? team.invoiceAccountCount : 0}
                    className={`text-gray-500 ${isLoading ? 'animate-pulse' : ''}`}
                    onClick={() => changeCurrentTab && changeCurrentTab(TabName.invoices)}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
});
