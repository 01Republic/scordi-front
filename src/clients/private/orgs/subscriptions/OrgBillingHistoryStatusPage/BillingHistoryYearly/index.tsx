import React, {forwardRef, memo, useEffect, useImperativeHandle, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {CurrencyToggle} from '^tasting/CurrencyToggle';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {billingHistoryApi} from '^models/BillingHistory/api';
import {BillingHistoriesYearlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {useBillingHistoryStatus} from '^hooks/useBillingHistoryStatus';
import {reverseArr} from '^utils/array';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {CardContainerTableLayout} from '^clients/private/_components/table/ListTable';
import {BillingHistoryYearlyHeader} from './BillingHistoryYearlyHeader';
import {BillingHistoryYearlyRow} from './BillingHistoryYearlyRow';
import {BillingHistoryYearColumn} from './BillingHistoryYearColumn';
import {makeYearlyExcelDownloader} from './makeYearlyExcelDownloader';

interface BillingHistoryYearlyProps {
    years: number[];
}

export const BillingHistoryYearly = memo(
    forwardRef(({years}: BillingHistoryYearlyProps, ref) => {
        const orgId = useRecoilValue(orgIdParamState);
        const displayCurrency = useRecoilValue(displayCurrencyAtom);
        const [isLoading, setIsLoading] = useState(false);
        const [histories, setHistories] = useState<BillingHistoriesYearlySumBySubscriptionDto[]>([]);
        const [filteredHistories, setFilteredHistories] = useState<BillingHistoriesYearlySumBySubscriptionDto[]>([]);

        const reversedYears = reverseArr(years);
        const exchangeRate = 1350; // TODO: 나중에 환율 API로 변경

        const sortedHistories = [...filteredHistories].sort((a, b) => {
            const avgCostA = a.getAverageCostToKRW(exchangeRate);
            const avgCostB = b.getAverageCostToKRW(exchangeRate);
            return avgCostB - avgCostA;
        });

        const search = (keyword?: string) => {
            if (!keyword) {
                setFilteredHistories(histories);
                return;
            }

            const result = histories.filter((his) => {
                return his.subscription.product.name().includes(keyword);
            });
            setFilteredHistories(result);
        };

        const onReady = debounce(async () => {
            setIsLoading(true);
            billingHistoryApi.statusApi
                .yearlySum(orgId)
                .then((res) => {
                    setFilteredHistories(res.data);
                    setHistories(res.data);
                })
                .finally(() => setIsLoading(false));
        }, 250);

        useEffect(() => {
            if (orgId && !isNaN(orgId)) onReady();
        }, [orgId]);

        // useImperativeHandle 로 상위 컴포넌트에 함수를 노출
        useImperativeHandle(ref, () => ({
            downloadExcel: makeYearlyExcelDownloader(sortedHistories, exchangeRate, displayCurrency),
            search,
        }));

        return (
            <CardContainerTableLayout isLoading={isLoading}>
                <div className={'flex justify-start pb-2'}>
                    <CurrencyToggle leftText={''} rightText={'원화로 보기'} className={'font-medium'} />
                </div>

                <div className="bg-white border border-gray-300 overflow-hidden shadow rounded-lg">
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full text-sm">
                            <BillingHistoryYearlyHeader years={reversedYears} />
                            <tbody>
                                {sortedHistories.length === 0 ? (
                                    <tr>
                                        <td colSpan={reversedYears.length + 3} className="text-center py-8">
                                            <EmptyTable message="데이터가 없습니다." />
                                        </td>
                                    </tr>
                                ) : (
                                    sortedHistories.map((history, i) => (
                                        <BillingHistoryYearlyRow
                                            key={i}
                                            data={history}
                                            exchangeRate={exchangeRate}
                                            renderColumns={(
                                                items: BillingHistoriesYearlySumBySubscriptionDto['items'],
                                            ) => {
                                                return reversedYears.map((year, i) => (
                                                    <BillingHistoryYearColumn
                                                        key={i}
                                                        currentData={items.find(({issuedYear}) => issuedYear === year)}
                                                        previousData={items.find(
                                                            ({issuedYear}) => issuedYear === years[i - 1],
                                                        )}
                                                        exchangeRate={exchangeRate}
                                                    />
                                                ));
                                            }}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </CardContainerTableLayout>
        );
    }),
);
