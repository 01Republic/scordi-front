import {useTossPaymentAuthCallback} from '^hooks/useTossPayments';
import {memo} from 'react';

interface Props {
    orgId: number;
}

export const TossPaymentAuthCallbackProvider = memo((props: Props) => {
    const {orgId} = props;

    useTossPaymentAuthCallback(orgId);

    return <></>;
});
