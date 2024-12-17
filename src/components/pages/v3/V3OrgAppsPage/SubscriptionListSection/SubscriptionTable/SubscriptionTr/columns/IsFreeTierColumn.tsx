import {memo} from 'react';
import {SubscriptionDto} from '^models/Subscription/types';
import {useToast} from '^hooks/useToast';
import {subscriptionApi} from '^models/Subscription/api';
import {SelectColumn} from '^v3/share/table/columns/SelectColumn';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {IsFreeTierTagUI} from '^models/Subscription/components/IsFreeTierTagUI';

interface IsFreeTierColumnProps {
    subscription: SubscriptionDto;
    onChange: (value: boolean) => any;
}

/**
 * 유/무료
 */
export const IsFreeTierColumn = memo((props: IsFreeTierColumnProps) => {
    const {toast} = useToast();
    const {subscription, onChange} = props;

    const onSelect = async (isFreeTier: boolean) => {
        if (isFreeTier == subscription.isFreeTier) return;

        return subscriptionApi
            .update(subscription.id, {isFreeTier})
            .then(() => onChange(isFreeTier))
            .finally(() => toast.success('변경사항을 저장했어요.'));
    };

    return (
        <SelectColumn
            value={subscription.isFreeTier}
            getOptions={async () => [true, false]}
            onSelect={onSelect}
            ValueComponent={IsFreeTierTag}
            contentMinWidth="240px"
            optionListBoxTitle="유/무료 여부를 변경합니다"
            inputDisplay={false}
        />
    );
});
IsFreeTierColumn.displayName = 'IsFreeTierColumn';

const IsFreeTierTag = memo((props: {value: boolean | string}) => {
    const {value} = props;
    return <IsFreeTierTagUI value={value as boolean} />;
});
