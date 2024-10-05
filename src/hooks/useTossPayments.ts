import {useCurrentUser} from '^models/User/hook';
import {tossPaymentsKey} from '^config/environments';
import {loadTossPayments} from '@tosspayments/tosspayments-sdk';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

export function useTossPayments() {
    const {currentUser} = useCurrentUser();
    const {query} = useRouter();
    const {pms, message} = query;

    const startBilling = async () => {
        if (!currentUser) return;
        const clientKey = tossPaymentsKey.clientKey;
        const tossPayments = await loadTossPayments(clientKey);
        const customerKey = currentUser.id.toString();
        const payment = tossPayments.payment({customerKey});

        payment
            .requestBillingAuth({
                method: 'CARD',
                successUrl: window.location.origin + window.location.pathname + '?pms=1',
                failUrl: window.location.origin + window.location.pathname + '?pms=0',
                customerEmail: currentUser.email,
                customerName: currentUser.name,
            })
            .catch((e) => toast.error(e.message));
    };

    useEffect(() => {
        if (pms === '1') {
            toast.success('카드 정보가 등록되었습니다 :)');
        } else if (pms === '0') {
            toast.error(message);
        }
    }, [pms]);

    return {startBilling};
}
