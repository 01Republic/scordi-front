import React, {forwardRef, memo, useEffect, useImperativeHandle, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
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
import {CurrencyCode} from '^models/Money';
import {useCurrentOrg2} from '^models/Organization/hook';
import {WideMode} from '../../OrgBillingHistoryStatusPage';

interface BillingHistoryMonthlyProps {
    focusYear: number;
    wideMode?: WideMode;
    stickyPos?: number;
}

export const BillingHistoryMonthly = memo(
    forwardRef(({focusYear, wideMode = WideMode.Narrow, stickyPos = 0}: BillingHistoryMonthlyProps, ref) => {
        const orgId = useRecoilValue(orgIdParamState);
        const [displayCurrency, setDisplayCurrency] = useRecoilState(displayCurrencyAtom);
        const [isLoading, setIsLoading] = useState(false);
        const [histories, setHistories] = useState<BillingHistoriesMonthlySumBySubscriptionDto[]>([]);
        const [filteredHistories, setFilteredHistories] = useState<BillingHistoriesMonthlySumBySubscriptionDto[]>([]);

        const {currentOrg} = useCurrentOrg2();
        const orgName = currentOrg?.name.trim().replace(/\s/g, '_');
        const filename = `${focusYear}_${orgName}_결제현황_월별_다운로드`;

        const months = rangeToArr(1, 12);
        const exchangeRate = 1350; // TODO: 나중에 환율 API로 변경

        const sortedHistories = [...filteredHistories].sort((a, b) => {
            const amtA = a.getCostSumToKRW(exchangeRate);
            const amtB = b.getCostSumToKRW(exchangeRate);
            return amtB - amtA;
        });

        const totals = sortedHistories.map((history) => history.getCostSum(exchangeRate));
        const totalAmount = totals.reduce((a, b) => a + b, 0);

        const search = (keyword = '') => {
            if (!keyword) {
                setFilteredHistories(histories);
                return;
            }

            const regex = new RegExp(keyword, 'i');

            const result = histories.filter((his) => {
                return regex.test(his.subscription.product.name());
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

        useEffect(() => {
            // 임시 작업. 처음 로드시 원래 통화로 보이도록
            setDisplayCurrency(CurrencyCode.USD);
        }, []);

        // useImperativeHandle 로 상위 컴포넌트에 함수를 노출
        useImperativeHandle(ref, () => ({
            downloadExcel: makeMonthlyExcelDownloader(sortedHistories, exchangeRate, displayCurrency, filename),
            search,
        }));

        return (
            <CardContainerTableLayout isLoading={isLoading}>
                {/*<div className={'flex justify-start pb-2'}>*/}
                {/*    <CurrencyToggle leftText={''} rightText={'원화로 보기'} className={'font-medium'} />*/}
                {/*</div>*/}

                <div className="bg-white border border-gray-300 overflow-hidden shadow rounded-lg">
                    <div className="overflow-x-auto w-full hide-scrollbar">
                        <table className="table w-full text-sm">
                            <BillingHistoryMonthlyHeader
                                focusYear={focusYear}
                                months={months}
                                wideMode={wideMode}
                                stickyPos={stickyPos}
                            />
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
                                            wideMode={wideMode}
                                            stickyPos={stickyPos}
                                            data={history}
                                            ratio={ratioOf(history.getCostSumToKRW(exchangeRate), totalAmount)}
                                            exchangeRate={exchangeRate}
                                            renderColumns={() => {
                                                return months.map((month, i) => (
                                                    <BillingHistoryMonthlyColumn
                                                        key={i}
                                                        currentData={history.findOfMonth(focusYear, month)}
                                                        previousData={history.findOfMonth(focusYear, month - 1)}
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
