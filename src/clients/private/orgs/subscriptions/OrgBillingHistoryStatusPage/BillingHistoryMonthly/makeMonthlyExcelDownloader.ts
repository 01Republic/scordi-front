import * as XLSX from 'xlsx';
import {CurrencyCode} from '^models/Money';
import {ratioOf} from '^models/Money/components/toFixedAmount';
import {BillingHistoriesMonthlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {yyyy_mm_dd} from '^utils/dateTime';
import {toast} from 'react-hot-toast';

export const makeMonthlyExcelDownloader = (
    histories: BillingHistoriesMonthlySumBySubscriptionDto[],
    exchangeRate: number,
    displayCurrency: CurrencyCode,
    filename: string,
) => {
    const totalAmount = histories.reduce((sum, monthly) => sum + monthly.getCostSumToKRW(exchangeRate), 0);
    const toPercentage = (amt: number) => `${ratioOf(amt, totalAmount).toFixed(2)}%`;

    return function downloadExcel() {
        const timestamp = yyyy_mm_dd(new Date());

        const createFormattedData = (currencyMode: 'KRW' | 'Original') => {
            return histories.map((history) => {
                const {subscription} = history;
                const currency = currencyMode === 'KRW' ? 'KRW' : subscription.currentBillingAmount?.code || 'KRW';

                // 총지출액
                const costSum =
                    currencyMode === 'KRW'
                        ? history.getCostSumToKRW(exchangeRate).toLocaleString()
                        : history.getCostSum(exchangeRate, displayCurrency).toLocaleString();

                // 평균지출액
                const averageCost =
                    currencyMode === 'KRW'
                        ? history.getAverageCostToKRW(exchangeRate).toLocaleString()
                        : history.getAverageCost(exchangeRate, displayCurrency).toLocaleString();

                const row: Record<string, any> = {
                    서비스명: subscription.product.name(),
                    유무료: subscription.isFreeTier ? '무료' : '유료',
                    지출비중: toPercentage(history.getCostSumToKRW(exchangeRate)),
                    통화: currency,
                    총지출액: costSum,
                    평균지출액: averageCost,
                };

                // Append month columns to row
                for (let month = 1; month <= 12; month++) {
                    const monthStr = month.toString().padStart(2, '0');
                    const item = history.items.find((item) => item.issuedYearMonth.split('-')[1] === monthStr);
                    const amount = item
                        ? currencyMode === CurrencyCode.KRW && item.code !== CurrencyCode.KRW
                            ? Math.round(item.amount * exchangeRate)
                            : item.code === CurrencyCode.KRW
                            ? Math.round(item.amount)
                            : item.amount
                        : 0;

                    row[`${monthStr}월`] = amount.toLocaleString();
                }

                return row;
            });
        };

        const worksheetKRW = XLSX.utils.json_to_sheet(createFormattedData('KRW'));
        const worksheetOriginal = XLSX.utils.json_to_sheet(createFormattedData('Original'));
        const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(workbook, worksheetKRW, '원화 기준');
        // XLSX.utils.book_append_sheet(workbook, worksheetOriginal, '결제 통화 기준');
        XLSX.utils.book_append_sheet(workbook, worksheetOriginal, `${timestamp} 결제현황 조회결과`);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
        toast.success('월별 결제현황 엑셀을 다운로드 했어요.');
    };
};
