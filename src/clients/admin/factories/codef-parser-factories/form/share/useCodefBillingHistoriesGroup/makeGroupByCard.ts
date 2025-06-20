import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {GroupingMethod} from '../../../CodefParserFactory/CreateCodefParserDto';
import {CodefBillingHistoriesGroup} from './types';
import {getRecurringType} from './getRecurringType';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';

export function makeGroupByCard(
    codefBillingHistories: CodefBillingHistoryDto[],
    groupMethod: GroupingMethod,
    fixedRecurringType?: BillingCycleOptions,
) {
    const groups: CodefBillingHistoriesGroup[] = [];

    // 주어진 결제내역이 여러 카드에 관한 것일 수 있으므로,
    // 카드로 우선 그룹을 나누어 둔다.
    const groupedByCard: Record<string, CodefBillingHistoryDto[]> = {};
    const cardMap: Record<string, CodefCardDto> = {};
    codefBillingHistories.forEach((his, i) => {
        if (his.codefCardId) {
            groupedByCard[his.codefCardId] ||= [];
            groupedByCard[his.codefCardId].push(his);
            cardMap[his.codefCardId] ||= his.codefCard!;
        }
        // if (his.codefBankAccountId) {
        //     groupedByCard[his.codefBankAccountId] ||= [];
        //     groupedByCard[his.codefBankAccountId].push(his);
        //     cardMap[his.codefBankAccountId] ||= his.codefBankAccount!;
        // }
    });

    Object.entries(groupedByCard).forEach(([codefCardIdStr, histories]) => {
        const codefCardId = Number(codefCardIdStr);

        groups.push({
            metadata: {
                groupKey: codefCardIdStr,
                groupMethod,
                codefCardId,
                codefCard: cardMap[codefCardId],
                billingCycleType: fixedRecurringType || getRecurringType(histories),
            },
            entries: histories, // 원래 주어질 때부터 desc
        });
    });

    return groups;
}
