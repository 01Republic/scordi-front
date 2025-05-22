import {GroupingMethod} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {CodefBillingHistoriesGroup} from './types';
import {getRecurringType} from './getRecurringType';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

/**
 * 계좌파서 > 그룹화 로직 : 계좌별
 */
export function makeGroupByBankAccount(
    codefBillingHistories: CodefBillingHistoryDto[],
    groupMethod: GroupingMethod,
    fixedRecurringType?: BillingCycleOptions,
) {
    const groups: CodefBillingHistoriesGroup[] = [];

    // 주어진 결제내역이 여러 카드에 관한 것일 수 있으므로,
    // 카드로 우선 그룹을 나누어 둔다.
    const groupedByCard: Record<string, CodefBillingHistoryDto[]> = {};
    const cardMap: Record<string, CodefBankAccountDto> = {};
    codefBillingHistories.forEach((his, i) => {
        if (his.codefBankAccountId) {
            groupedByCard[his.codefBankAccountId] ||= [];
            groupedByCard[his.codefBankAccountId].push(his);
            cardMap[his.codefBankAccountId] ||= his.codefBankAccount!;
        }
    });

    Object.entries(groupedByCard).forEach(([codefBankAccountIdStr, histories]) => {
        const codefBankAccountId = Number(codefBankAccountIdStr);

        groups.push({
            metadata: {
                groupKey: codefBankAccountIdStr,
                groupMethod,
                codefBankAccountId,
                codefBankAccount: cardMap[codefBankAccountId],
                billingCycleType: fixedRecurringType || getRecurringType(histories),
            },
            entries: histories, // 원래 주어질 때부터 desc
        });
    });

    return groups;
}
