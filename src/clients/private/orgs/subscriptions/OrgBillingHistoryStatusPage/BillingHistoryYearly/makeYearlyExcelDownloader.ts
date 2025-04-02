import * as XLSX from 'xlsx';
import {CurrencyCode} from '^models/Money';
import {BillingHistoriesYearlySumBySubscriptionDto} from '^models/BillingHistory/type';
import {yyyy_mm_dd} from '^utils/dateTime';
import {toast} from 'react-hot-toast';

export const makeYearlyExcelDownloader = (
    histories: BillingHistoriesYearlySumBySubscriptionDto[],
    exchangeRate: number,
    displayCurrency: CurrencyCode,
    filename: string,
) => {
    return function downloadExcel() {
        const timestamp = yyyy_mm_dd(new Date());

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

                history.items.forEach((item) => {
                    const amount = item
                        ? currencyMode === CurrencyCode.KRW && item.code !== CurrencyCode.KRW
                            ? Math.round(item.amount * exchangeRate)
                            : item.code === CurrencyCode.KRW
                            ? Math.round(item.amount)
                            : item.amount
                        : 0;

                    row[`${item.issuedYear}년`] = amount.toLocaleString();
                });

                // 지출액이 0인 연도 표시
                const allYears = new Set(histories.flatMap((h) => h.items.map((i) => i.issuedYear)));
                allYears.forEach((year) => {
                    if (!row.hasOwnProperty(`${year}년`)) {
                        row[`${year}년`] = '0';
                    }
                });

                return row;
            });
        };

        const worksheetKRW = XLSX.utils.json_to_sheet(createFormattedData('KRW'));
        const worksheetOriginal = XLSX.utils.json_to_sheet(createFormattedData('Original'));
        const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(workbook, worksheetKRW, '원화 기준');
        // XLSX.utils.book_append_sheet(workbook, worksheetOriginal, '결제 통화 기준');
        XLSX.utils.book_append_sheet(workbook, worksheetOriginal, `${timestamp} 조회결과`);
        XLSX.writeFile(workbook, `${filename}.xlsx`);
        toast.success('연도별 결제현황 엑셀을 다운로드 했어요.');
    };
};
