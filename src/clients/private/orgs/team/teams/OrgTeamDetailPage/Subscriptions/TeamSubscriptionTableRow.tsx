import React, {memo} from 'react';
import Tippy from '@tippyjs/react';
import {toast} from 'react-hot-toast';
import {SubscriptionDto} from '^models/Subscription/types';
import {SubscriptionProfile, MemberCount} from '^models/Subscription/components';
import {AirInputText} from '^v3/share/table/columns/share/AirInputText';
import {subscriptionApi} from '^models/Subscription/api';
import {FiMinusCircle} from '^components/react-icons';

interface SubscriptionTableRowProps {
    subscription: SubscriptionDto;
    reload: () => any;
}

export const SubscriptionTableRow = memo((props: SubscriptionTableRowProps) => {
    const {subscription, reload} = props;

    const updateMemo = async (desc: string) => {
        subscriptionApi
            .update(subscription.id, {desc})
            .then(() => toast.success('수정했습니다'))
            .catch(() => toast.error('문제가 발생했습니다'))
            .finally(() => reload && reload());
    };

    return (
        <tr>
            {/* 서비스 명 */}
            <td>
                <SubscriptionProfile subscription={subscription} />
            </td>

            {/* 사용인원 */}
            <td className="text-center">
                <MemberCount subscription={subscription} />
            </td>

            {/* 비고 */}
            <td>
                <AirInputText defaultValue={subscription.desc || undefined} onChange={updateMemo} />
            </td>

            {/* Actions */}
            <td>
                {/*<TeamMemberStatusDropdown teamMember={teamMember} reload={() => reload && reload()} />*/}
                <div className="flex items-center justify-end">
                    <Tippy content="이 팀에서 제거">
                        <div>
                            <FiMinusCircle
                                fontSize={24}
                                className="text-red-500 opacity-30 group-hover:opacity-100 transition-all cursor-pointer btn-animation"
                            />
                        </div>
                    </Tippy>
                </div>
            </td>
        </tr>
    );
});
SubscriptionTableRow.displayName = 'SubscriptionTableRow';
