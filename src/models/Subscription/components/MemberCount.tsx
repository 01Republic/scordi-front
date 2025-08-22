import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {unitFormat} from '^utils/number';

interface MemberCountProps {
    subscription: SubscriptionDto;
}

export const MemberCount = memo((props: MemberCountProps) => {
    const {subscription} = props;

    // 사용중인 사용자 수 (라이선스에서 사용중인 시트 수)
    const usedMemberCount = subscription.usedMemberCount || 0;

    // 결제되는 사용자 수 (라이선스에 따른 총 시트 수)
    const paidMemberCount = subscription.paidMemberCount || 0;

    /**
     * 선구매 시트를 사용중인 구독인지 여부
     * ---
     * 원래는 subscription.isSeatReserving 이라는 컬럼을 만들어서 사용해야 합니다.
     * 그러나 아직 선구매 시트 개념이 구현되어있지 않습니다.
     *
     * 일반적으로 작은 기업은 SaaS 구독에 멤버를 초대 또는 삭제함으로써 시트가 증감됩니다.
     * 그러나 기업이 커질수록 가격 절감을 위해 리셀러(MSP)를 통해 관리형 서비스를 이용합니다.
     * 이 경우, 기업은 "멤버할당여부와 무관하게 빈 시트를 약정을 걸고 대량 구매"하는 대신에 시트당 단가를 할인받습니다.
     *
     * "선구매 시트" 는 리셀러를 통해 멤버 할당 없이 구매한 시트를 의미합니다.
     * 이를 엔티티 관점에서 해석하면 다음과 같은 특징들이 있습니다.
     * - 선구매 시트는 "시트의 등록"과 "해당 시트에 멤버 할당"이 별개의 행위로 구분될 수 있습니다. (SubscriptionSeat.teamMemberId 가 Nullable)
     * - paidMemberCount 는 구매한 시트수 이고, usedMemberCount 는 할당된 시트수 입니다.
     * - "선구매 시트" 를 이용하는 구독은 paidMemberCount 와 usedMemberCount 가 다를 수 있습니다.
     * - "선구매 시트" 를 이용하지 않는 일반 구독은 paidMemberCount 와 usedMemberCount 가 항상 같습니다.
     *
     * 현재로써는 선구매 시트의 개념이 subscription 에 isSeatReserving 컬럼으로 구현되어 있지 않습니다. (추후 구현되어야 합니다.)
     * 따라서 "사용인원" 컬럼은 아직 "구매한 시트수" 와 "할당된 시트수" 가 분리되어 있어야 할 이유가 없습니다.
     */
    const isReservedSeatSubscription = usedMemberCount !== paidMemberCount;

    return (
        <div>
            {isReservedSeatSubscription ? (
                <div className="text-sm flex items-center justify-end gap-0.5">
                    <span>{usedMemberCount.toLocaleString()}</span>
                    <span>/</span>
                    <span>{paidMemberCount.toLocaleString()}</span>
                </div>
            ) : (
                <div className="text-sm flex items-end justify-end gap-0.5">
                    <span>{unitFormat(usedMemberCount, '명')}</span>
                </div>
            )}
        </div>
    );
});
MemberCount.displayName = 'MemberCount';
