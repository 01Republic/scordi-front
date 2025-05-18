import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {GroupingMethod} from '../../../CodefParserFactory/CreateCodefParserDto';
import {CodefBillingHistoriesGroup, GroupContainerKey} from './types';
import {getRecurringType} from './getRecurringType';
import {getDay} from './getDay';
import {getOrderedHistories} from './getOrderedHistories';

export function makeGroupByDate(codefBillingHistories: CodefBillingHistoryDto[], groupMethod: GroupingMethod) {
    const groups: CodefBillingHistoriesGroup[] = [];

    // 주어진 결제내역을 날짜별로 정렬합니다. (시간순)
    const orderedHistories = getOrderedHistories(codefBillingHistories, 'ASC');

    // 주어진 결제내역이 여러 카드에 관한 것일 수 있으므로,
    // 카드로 우선 그룹을 나누어 둔다.
    const groupedByCard: Record<string, CodefBillingHistoryDto[]> = {};
    const cardMap: Record<string, CodefCardDto> = {};
    orderedHistories.forEach((his, i) => {
        groupedByCard[his.codefCardId] ||= [];
        groupedByCard[his.codefCardId].push(his);
        cardMap[his.codefCardId] ||= his.codefCard!;
    });

    Object.entries(groupedByCard).forEach(([codefCardIdStr, histories]) => {
        // 카드 그룹내에서, 결제내역을 순회한다.
        let drainKey = '';
        const container: Record<string, CodefBillingHistoryDto[]> = {};
        histories.forEach((his, i) => {
            const keyObj: GroupContainerKey = {codefCardId: Number(codefCardIdStr), groupKey: getDay(his)};
            const key = JSON.stringify(keyObj);

            if (!drainKey) {
                // 일반 모드에서는 일단 해당 날짜 집계에 집어넣는다.
                container[key] ||= [];
                container[key].push(his);
                // 결제 실패 건이 발생하면, 본 날짜를 드레인키로 잡아 드레인 모드를 활성화 한다.
                if (!his.isSuccess) {
                    drainKey = key;
                    his.drainedCodefBillingHistoryId = i; // 계산용 필드로 취급하므로 여기서는 index 를 넣습니다.
                }
            } else {
                // 이전 순회로부터 드레인 모드 상태라면, 설정된 드레인키 날짜로 결제 건을 추가한다.
                container[drainKey] ||= [];
                container[drainKey].push(his);
                his.drainedCodefBillingHistoryId = histories[i - 1].drainedCodefBillingHistoryId;
                // 그러다가 결제 성공건이 생긴다면, 드레인키를 비워 드레인 모드를 해제한다.
                if (his.isSuccess) {
                    drainKey = '';
                }
            }
        });

        // 그룹별로 자료구조를 맞추어 목록에 담는다.
        Object.entries(container).forEach(([key, entries]) => {
            const keyObj = JSON.parse(key) as GroupContainerKey;
            const regularRecurringList = entries.filter((his) => getDay(his) === keyObj.groupKey);

            groups.push({
                metadata: {
                    groupKey: keyObj.groupKey, // day string ex: '12'
                    groupMethod,
                    codefCardId: keyObj.codefCardId,
                    codefCard: cardMap[keyObj.codefCardId],
                    billingCycleType: getRecurringType(regularRecurringList),
                },
                entries: entries.reverse(), // asc 를 desc 로 반전시킴
            });
        });
    });

    return groups;
}
