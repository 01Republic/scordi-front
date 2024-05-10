import {memo} from 'react';
import {RecurringAmount, RecurringDate} from '../inputs';
import {StepLayout} from '../_common/StepLayout';

export const SubscriptionInfo = memo(() => {
    return (
        <StepLayout title="얼마에 구독하고 있나요? ✍️" desc="구독 요금제를 기반으로 아래 항목을 입력해주세요.">
            <RecurringAmount />
            {/*<RecurringDate />*/}
        </StepLayout>
    );
});
SubscriptionInfo.displayName = 'SubscriptionInfo';
