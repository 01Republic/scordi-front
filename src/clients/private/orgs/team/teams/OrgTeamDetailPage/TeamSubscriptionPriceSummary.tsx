import React, {memo} from 'react';
import {currencyFormat, roundNumber} from '^utils/number';
import {firstDayOfMonth, lpp} from '^utils/dateTime';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {CalendarDays, RotateCw} from 'lucide-react';
import {useCurrentTeamSubscriptionPriceSummary} from '^models/Team/hook';

export const TeamSubscriptionPriceSummary = memo(() => {
    const orgId = useOrgIdParam();
    const teamId = useIdParam('teamId');
    const currentDate = new Date();

    const {data, refetch, isLoading} = useCurrentTeamSubscriptionPriceSummary(orgId, teamId, {
        startDate: firstDayOfMonth(currentDate),
    });

    return (
        <div className="bg-slate-100 rounded-lg p-2 shadow-lg">
            <div className="flex items-center justify-between mb-1.5 md:mb-3">
                <span className="text-12 text-gray-400">이 팀에서 지출된 총 구독 비용</span>
                <RotateCw
                    onClick={() => refetch()}
                    className={`text-12 text-gray-400 hover:text-black transition cursor-pointer ${
                        isLoading ? 'animate-spin' : ''
                    }`}
                />
            </div>

            <div className="w-full py-1 sm:py-2 px-3 bg-white rounded-lg gap-2 flex flex-col shadow-lg">
                <div className="flex gap-1">
                    <CalendarDays className="text-red-400" />
                    <span className="text-gray-500 text-12">{lpp(currentDate, 'M')}월</span>
                </div>
                <span className="font-medium text-24 md:text-28">
                    {currencyFormat(roundNumber(data?.success.amount || 0))}
                </span>
            </div>
        </div>
    );
});
