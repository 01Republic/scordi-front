import {useTossPaymentAuthCallback} from '^hooks/useTossPayments';
import {memo} from 'react';
import {ApiError} from '^api/api';

interface Props {
    orgId: number;
    onSuccess: () => any;
    onFailure?: (e: ApiError) => any;
    onFinally?: () => any;
}

export const TossPaymentAuthCallbackProvider = memo((props: Props) => {
    const {orgId, onSuccess, onFailure, onFinally} = props;

    useTossPaymentAuthCallback(orgId, {onSuccess, onFailure, onFinally});

    return <></>;
});
