import {memo} from 'react';
import {
    SubscriptionDto,
    SubscriptionStatus as SubscriptionStatusType,
    SubscriptionStatusValues,
    t_SubscriptionStatus,
    c_SubscriptionStatus,
} from '^models/Subscription/types';
import {useToast} from '^hooks/useToast';
import {subscriptionApi} from '^models/Subscription/api';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface SubscriptionStatusProps {
    subscription: SubscriptionDto;
    onChange: (value: SubscriptionStatusType) => any;
    // lastPaidAt: Date | null;
    // nextPayDate: Date | null;
    // nextPayAmount: MoneyDto | null;
}

/**
 * 구독 상태
 */
export const SubscriptionStatus = memo((props: SubscriptionStatusProps) => {
    const {toast} = useToast();
    const {subscription, onChange} = props;

    const onSelect = async (status: SubscriptionStatusType) => {
        if (status == subscription.status) return;

        // 구독 업데이트 api
        return subscriptionApi
            .update(subscription.id, {status: status})
            .then(() => onChange(status))
            .finally(() => toast.success('수정했습니다'));
    };

    return (
        <SelectColumn
            value={subscription.status}
            getOptions={async () => SubscriptionStatusValues}
            onSelect={onSelect}
            ValueComponent={SubscriptionStatusTag}
            contentMinWidth="240px"
            optionListBoxTitle="변경할 상태를 선택해주세요"
            inputDisplay={false}
        />
    );
});
SubscriptionStatus.displayName = 'SubscriptionStatus';

const SubscriptionStatusTag = memo((props: {value: SubscriptionStatusType | string}) => {
    const {value} = props;
    const colorClass = c_SubscriptionStatus(value as SubscriptionStatusType);
    const text = t_SubscriptionStatus(value as SubscriptionStatusType);

    return <TagUI className={colorClass}>{text}</TagUI>;
});
