import React, {memo} from 'react';
import {DashboardSummaryYearMonthlyItemDto, DashboardSummaryYearMonthlyResultDto} from '^models/_dashboard/type';
import {currencyFormat, roundNumber} from '^utils/number';
import {DashboardSectionLayout} from '../../DashboardSectionLayout';
import {BarGraph} from './BarGraph';
import {LinkTo} from '^components/util/LinkTo';
import {OrgSubscriptionListPageRoute} from '^pages/orgs/[id]/subscriptions';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgBillingHistoryStatusPageRoute} from '^pages/orgs/[id]/billingHistories/status';
import {ChevronLeft, ChevronRight} from 'lucide-react';

interface YearMonthlyGraphSectionProps {
    result?: DashboardSummaryYearMonthlyResultDto;
    isLoading?: boolean;
    changeMonthlyItem?: (monthlyItem?: DashboardSummaryYearMonthlyItemDto) => any;
    year: number;
    changeYear?: (year: number) => any;
}

export const YearMonthlyGraphSection = memo((props: YearMonthlyGraphSectionProps) => {
    const {year, changeYear, result, isLoading = false, changeMonthlyItem} = props;
    const orgId = useRecoilValue(orgIdParamState);

    const lastYear = new Date().getFullYear();
    const yearName = year === lastYear ? '올해' : `${year}년`;

    const AllInvoiceAccountShowButton = () => (
        <LinkTo href={OrgBillingHistoryStatusPageRoute.path(orgId)} className="font-semibold text-14 text-gray-400">
            전체보기
        </LinkTo>
    );

    const PrevNextButton = () => {
        if (!changeYear) return <></>;

        return (
            <div className="flex items-center gap-2">
                <button className="btn btn-sm btn-ghost btn-square" onClick={() => changeYear(year - 1)}>
                    <ChevronLeft />
                </button>
                <button
                    className="btn btn-sm btn-ghost btn-square"
                    onClick={() => {
                        if (year >= lastYear) return;
                        changeYear(year + 1);
                    }}
                >
                    <ChevronRight />
                </button>
            </div>
        );
    };

    return (
        <DashboardSectionLayout
            title={`${yearName}의 지출 총액`}
            Buttons={AllInvoiceAccountShowButton}
            isLoading={isLoading}
            className="max-h-[826px]"
        >
            <section className="w-full flex flex-col gap-2 sm:gap-4 md:gap-6 lg:gap-10">
                <div className="flex gap-5">
                    <section className="w-full flex flex-col gap-1 md:gap-3 border rounded-xl p-4 md:p-5">
                        <div className="flex flex-col items-start sm:items-center sm:flex-row md:items-start md:flex-col lg:items-center lg:flex-row">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-800 rounded-full" />
                                <p>{year}년, 오늘&nbsp;</p>
                            </div>
                            <p className="pl-4 sm:pl-0 md:pl-4 lg:pl-0">기준 구독 지출액</p>
                        </div>
                        <p className="font-bold text-20 md:text-24 lg:text-28">
                            {currencyFormat(roundNumber(result?.didPayAmount || 0))}
                        </p>
                    </section>
                    <section className="w-full flex flex-col gap-1 md:gap-3 border rounded-xl p-4 md:p-5">
                        <div className="flex flex-col items-start sm:items-center sm:flex-row md:items-start md:flex-col lg:items-center lg:flex-row">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-pink-200 rounded-full" />
                                <p>{year}년, 예상&nbsp;</p>
                            </div>
                            <p className="pl-4 sm:pl-0 md:pl-4 lg:pl-0">구독 지출액</p>
                        </div>
                        <p className="font-bold text-20 md:text-24 lg:text-28">
                            {currencyFormat(roundNumber(result?.totalOnThisYear || 0))}
                        </p>
                    </section>
                </div>
                <BarGraph result={result} changeMonthlyItem={changeMonthlyItem} />
            </section>
        </DashboardSectionLayout>
    );
});

//font-bold text-20 md:text-24 lg:text-28 flex items-center gap-2 lg:gap-3
