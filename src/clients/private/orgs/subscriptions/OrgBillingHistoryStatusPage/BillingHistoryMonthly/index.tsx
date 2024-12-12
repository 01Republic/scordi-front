import React, {forwardRef, memo, useEffect, useImperativeHandle, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {CurrencyToggle} from '^tasting/CurrencyToggle';
import {displayCurrencyAtom} from '^tasting/pageAtoms';
import {rangeToArr} from '^utils/range';
import {ratioOf} from '^models/Money/components/toFixedAmount';
import {BillingHistoriesMonthlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {CardContainerTableLayout} from '^clients/private/_components/table/ListTable';
import {BillingHistoryMonthlyRow} from './BillingHistoryMonthlyRow';
import {BillingHistoryMonthlyColumn} from './BillingHistoryMonthlyColumn';
import {BillingHistoryMonthlyHeader} from './BillingHistoryMonthlyHeader';
import {makeMonthlyExcelDownloader} from './makeMonthlyExcelDownloader';
import {orgIdParamState} from '^atoms/common';
import {debounce} from 'lodash';
import {billingHistoryApi} from '^models/BillingHistory/api';

interface BillingHistoryMonthlyProps {
    focusYear: number;
}

export const BillingHistoryMonthly = memo(
    forwardRef(({focusYear}: BillingHistoryMonthlyProps, ref) => {
        const orgId = useRecoilValue(orgIdParamState);
        const displayCurrency = useRecoilValue(displayCurrencyAtom);
        const [isLoading, setIsLoading] = useState(false);
        const [histories, setHistories] = useState<BillingHistoriesMonthlySumBySubscriptionDto[]>([]);
        const [filteredHistories, setFilteredHistories] = useState<BillingHistoriesMonthlySumBySubscriptionDto[]>([]);

        const months = rangeToArr(1, 12);
        const totalAmount = histories.reduce((sum, monthly) => sum + monthly.getCostSumToKRW(exchangeRate), 0);
        const exchangeRate = 1350; // TODO: 나중에 환율 API로 변경

        const sortedHistories = [...filteredHistories].sort((a, b) => {
            const amtA = a.getCostSumToKRW(exchangeRate);
            const amtB = b.getCostSumToKRW(exchangeRate);
            return amtB - amtA;
        });

        const search = (keyword = '') => {
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
                .monthlySum(orgId, focusYear)
                .then((res) => {
                    setFilteredHistories(res.data);
                    setHistories(res.data);
                })
                .finally(() => setIsLoading(false));
        }, 250);

        useEffect(() => {
            if (orgId && !isNaN(orgId)) onReady();
        }, [orgId, focusYear]);

        // useImperativeHandle 로 상위 컴포넌트에 함수를 노출
        useImperativeHandle(ref, () => ({
            downloadExcel: makeMonthlyExcelDownloader(sortedHistories, exchangeRate, displayCurrency),
            search,
        }));

        return (
            <CardContainerTableLayout isLoading={isLoading}>
                <div className={'flex justify-start pb-2'}>
                    <CurrencyToggle leftText={''} rightText={'원화로 보기'} className={'font-medium'} />
                </div>

                <div className="bg-white border border-gray-300 overflow-hidden shadow rounded-lg">
                    <div className="overflow-x-auto w-full hide-scrollbar">
                        <table className="table w-full text-sm">
                            <BillingHistoryMonthlyHeader months={months} />
                            <tbody>
                                {histories.length === 0 ? (
                                    <tr>
                                        <td colSpan={5 + 12} className="text-center py-8">
                                            <EmptyTable message="데이터가 없습니다." />
                                        </td>
                                    </tr>
                                ) : (
                                    sortedHistories.map((history, i) => (
                                        <BillingHistoryMonthlyRow
                                            key={i}
                                            data={history}
                                            ratio={ratioOf(history.getCostSumToKRW(exchangeRate), totalAmount)}
                                            exchangeRate={exchangeRate}
                                            renderColumns={(
                                                items: BillingHistoriesMonthlySumBySubscriptionDto['items'],
                                            ) => {
                                                return months.map((_, i) => {
                                                    const defaultData = {amount: 0, symbol: items[0]?.symbol};
                                                    const currentData = items[i] || defaultData;
                                                    const previousData = i > 0 ? items[i - 1] : currentData;
                                                    return (
                                                        <BillingHistoryMonthlyColumn
                                                            key={i}
                                                            currentData={currentData}
                                                            previousData={previousData}
                                                            exchangeRate={exchangeRate}
                                                        />
                                                    );
                                                });
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
