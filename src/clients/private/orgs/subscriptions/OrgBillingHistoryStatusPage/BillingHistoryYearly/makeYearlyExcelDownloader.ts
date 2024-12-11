import * as XLSX from 'xlsx';
import {CurrencyCode} from '^models/Money';
import {BillingHistoriesYearlySumBySubscriptionDto} from '^models/BillingHistory/type';

export const makeYearlyExcelDownloader = (
    histories: BillingHistoriesYearlySumBySubscriptionDto[],
    exchangeRate: number,
    displayCurrency: CurrencyCode,
) => {
    return function downloadExcel() {
        const createFormattedData = (currencyMode: 'KRW' | 'Original') => {
            return histories.map((history) => {
                const {subscription} = history;
                const currency = currencyMode === 'KRW' ? 'KRW' : subscription.currentBillingAmount?.code || 'KRW';
                const averageCost =
                    currencyMode === 'KRW'
                        ? history.getAverageCostToKRW(exchangeRate).toLocaleString()
                        : history.getAverageCost(exchangeRate, displayCurrency).toLocaleString();

                const row: Record<string, any> = {
                    서비스명: subscription.product.name(),
                    유무료: subscription.isFreeTier ? '무료' : '유료',
                    통화: currency,
                    평균지출액: averageCost,
                };

                // Append year columns to row
                history.items.forEach((item) => {
                    const amount =
                        currencyMode === CurrencyCode.KRW && item.code !== CurrencyCode.KRW
                            ? item.amount * exchangeRate
                            : item.amount;

                    row[`${item.issuedYear}년`] = amount.toLocaleString();
                });

                return row;
            });
        };

        const worksheetKRW = XLSX.utils.json_to_sheet(createFormattedData('KRW'));
        const worksheetOriginal = XLSX.utils.json_to_sheet(createFormattedData('Original'));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheetKRW, '원화 기준');
        XLSX.utils.book_append_sheet(workbook, worksheetOriginal, '결제 통화 기준');

        const fileName = `결제현황_다운로드.xlsx`;

        XLSX.writeFile(workbook, fileName);
    };
};
