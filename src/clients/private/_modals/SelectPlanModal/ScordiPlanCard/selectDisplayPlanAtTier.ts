import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';

export function selectDisplayPlanAtTier(scordiPlan: ScordiPlanDto, currentSubscription: ScordiSubscriptionDto | null) {
    // '워크스페이스가 현재 구독중인 플랜'을 이하 '현재플랜' 이라고 말합니다.

    /**
     * 현재플랜이 없으면, 별도의 판단 없이 주어진 플랜을 그대로 노출합니다.
     * - 그런데, 데이터 관점에서는 워크스페이스가 현재 구독중인 플랜이 없는 경우가 없습니다.
     * - 즉, 코드상 이 함수의 두 번째 인자인 currentSubscription 가 입력되지 않거나 값이 비는 경우를 대비한 방어적인 장치로 기능합니다.
     */
    if (!currentSubscription) {
        return {
            plan: scordiPlan,
            isCurrent: false,
        };
    }

    // /**
    //  * 현재플랜과 서로 같은 티어의 플랜이 쿠폰코드로 조회된 플랜일 때,
    //  * 주어진 플랜과 현재 플랜이 서로 다른 쿠폰코드의 플랜이라면,
    //  * 현재플랜 대신에 주어진 플랜을 노출합니다.
    //  */
    // if (scordiPlan.secretCode && scordiPlan.secretCode != currentSubscription.scordiPlan.secretCode) {
    //     return {
    //         plan: scordiPlan,
    //         isCurrent: false,
    //     };
    // }

    /**
     * 이상의 구문이 특수 케이스에 대한 비교식이라면, 이하 아래는 일반적인 비교식입니다.
     * - 현재플랜의 티어와 주어진 플랜의 티어가 같으면, 본 플랜 카드는 "현재" 상태입니다.
     * - "현재" 상태라면, 주어진 플랜을 무시하고 대신에 "현재플랜"을 카드에 노출합니다.
     *
     * 이를 통해 현재 결제중인 플랜이 특수조건에서만 노출되는 플랜이었다 할지라도,
     * 기본적으로 해당 티어에서는 결제중인 현재플랜을 우선적용해 UI에 노출해줄 수 있고,
     * 따라서 동일한 티어의 다른 플랜에 의도하지 않은 중복결제를 UX 로 방지 할 수 있습니다.
     */
    const isCurrent = scordiPlan.priority === currentSubscription.scordiPlan.priority;
    const plan = isCurrent ? currentSubscription.scordiPlan : scordiPlan;

    return {
        plan,
        isCurrent,
    };
}
