import {memo} from 'react';
import {
    c_SubscriptionStatus,
    SubscriptionDto,
    SubscriptionStatus as SubscriptionStatusType,
    t_SubscriptionStatus,
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

export const SubscriptionStatus = memo((props: SubscriptionStatusProps) => {
    const {toast} = useToast();
    const {subscription, onChange} = props;

    const onClick = (status: SubscriptionStatusType) => {
        if (status == subscription.status) return;

        // 구독 업데이트 api
        subscriptionApi
            .update(subscription.id, {status: status})
            .then(() => onChange(status))
            .finally(() => toast.success('수정했습니다'));
    };

    return (
        <SelectColumn
            value={subscription.status}
            getOptions={async () => Object.values(SubscriptionStatusType)}
            onOptionClick={onClick}
            ValueComponent={SubscriptionStatusTag}
            contentMinWidth="240px"
            optionListBoxTitle="변경할 상태를 선택해주세요"
        />
    );
});
SubscriptionStatus.displayName = 'SubscriptionStatus';

const SubscriptionStatusTag = memo((props: {value: SubscriptionStatusType}) => {
    const {value} = props;

    return <TagUI className={c_SubscriptionStatus(value)}>{t_SubscriptionStatus(value)}</TagUI>;
});
