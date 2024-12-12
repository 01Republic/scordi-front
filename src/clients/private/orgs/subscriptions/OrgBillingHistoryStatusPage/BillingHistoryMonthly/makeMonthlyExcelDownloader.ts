import * as XLSX from 'xlsx';
import {CurrencyCode} from '^models/Money';
import {ratioOf} from '^models/Money/components/toFixedAmount';
import {BillingHistoriesMonthlySumBySubscriptionDto} from '^models/BillingHistory/type';

export const makeMonthlyExcelDownloader = (
    histories: BillingHistoriesMonthlySumBySubscriptionDto[],
    exchangeRate: number,
    displayCurrency: CurrencyCode,
) => {
    const totalAmount = histories.reduce((sum, monthly) => sum + monthly.getCostSumToKRW(exchangeRate), 0);
    const toPercentage = (amt: number) => `${ratioOf(amt, totalAmount).toFixed(1)}%`;

    return function downloadExcel() {
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
                history.items.forEach((item, index) => {
                    const amount =
                        currencyMode === CurrencyCode.KRW && item.code !== CurrencyCode.KRW
                            ? item.amount * exchangeRate
                            : item.amount;

                    row[`${index + 1}월`] = amount.toLocaleString();
                });

                return row;
            });
        };

        const worksheetKRW = XLSX.utils.json_to_sheet(createFormattedData('KRW'));
        const worksheetOriginal = XLSX.utils.json_to_sheet(createFormattedData('Original'));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheetKRW, '원화 기준');
        XLSX.utils.book_append_sheet(workbook, worksheetOriginal, '결제 통화 기준');
        XLSX.writeFile(workbook, `결제현황_다운로드.xlsx`);
    };
};
