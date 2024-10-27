import {useCurrentUser} from '^models/User/hook';
import {tossPaymentsKey} from '^config/environments';
import {loadTossPayments} from '@tosspayments/tosspayments-sdk';
import {toast} from 'react-hot-toast';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {CreateScordiPaymentMethodRequestDto} from '^models/_scordi/ScordiPaymentMethod/type';
import {scordiPaymentMethodApi} from '^models/_scordi/ScordiPaymentMethod/api';
import {useRecoilState} from 'recoil';
import {createPaymentMethodQueryAtom} from '^models/_scordi/toss-payment/atom';
import {useCurrentScordiSubscription} from '^models/_scordi/ScordiSubscription/hook';
import {delay} from '^components/util/delay';
import {useScordiPaymentMethodsInSettingPage} from '^models/_scordi/ScordiPaymentMethod/hook';
import {useScordiPaymentsInSettingPage} from '^models/_scordi/ScordiPayment/hook';

const parseQueryValue = (value: string | string[] | undefined): string => {
    return [value].flat().join(',') || '';
};

const urlWithQuery = (args: string[] = []) => {
    const base = window.location.origin + window.location.pathname;
    const query = args.join('&');
    return [base, query].filter((e) => e).join('?');
};

export function useTossPayments() {
    const {currentUser} = useCurrentUser();

    const requestBillingAuth = async (planId?: number) => {
        if (!currentUser) return;
        const tossPayments = await loadTossPayments(tossPaymentsKey.clientKey);
        const payment = tossPayments.payment({
            customerKey: `User-${currentUser.id}`,
        });

        const callbackUrl = (pmsValue: number) => {
            const args = [`pms=${pmsValue}`];
            if (planId) args.push(`planId=${planId}`);
            return urlWithQuery(args);
        };

        return payment
            .requestBillingAuth({
                method: 'CARD',
                successUrl: callbackUrl(1),
                failUrl: callbackUrl(0),
                customerEmail: currentUser.email,
                customerName: currentUser.name,
            })
            .catch((e) => toast.error(e.message));
    };

    return {requestBillingAuth};
}

export const useTossPaymentAuthCallback = (orgId: number) => {
    const {query, reload, replace} = useRouter();
    const pms = parseQueryValue(query['pms']);
    const isLoaded = ['1', '0'].includes(pms);
    const isAuthSuccess = pms === '1';
    const errorMessage = parseQueryValue(query['message']);
    const customerKey = parseQueryValue(query['customerKey']);
    const authKey = parseQueryValue(query['authKey']);
    const selectedPlanId = Number(parseQueryValue(query['planId']));
    const [reqBody, setReqBody] = useRecoilState(createPaymentMethodQueryAtom);
    const {update: createSubscription} = useCurrentScordiSubscription();
    const {reload: reloadPaymentMethods} = useScordiPaymentMethodsInSettingPage();
    const {reload: reloadPaymentHistories} = useScordiPaymentsInSettingPage();

    const reloadResources = async () => {
        reloadPaymentMethods();
        reloadPaymentHistories();
    };

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        if (!isLoaded) return;
        if (!isAuthSuccess) {
            toast.error(errorMessage);
            return;
        }

        if (authKey && customerKey) {
            createPaymentMethod(orgId, {authKey, customerKey}).then(async () => {
                // 결제수단 변경 시퀀스 분기 처리
                if (!selectedPlanId || isNaN(selectedPlanId)) {
                    toast.success('카드를 등록했어요');
                    return replace(urlWithQuery()).then(() => reloadResources()); // 흐름차단
                }

                // 구독 등록 시퀀스 시작
                return createSubscription(orgId, selectedPlanId).then(async () => {
                    return replace(urlWithQuery()).then(() => reloadResources()); // 흐름차단
                });
            });
        }
    }, [orgId, isLoaded]);

    const createPaymentMethod = async (orgId: number, data: CreateScordiPaymentMethodRequestDto) => {
        if (!orgId || isNaN(orgId)) return;
        if (reqBody && JSON.stringify(reqBody) === JSON.stringify(data)) return;
        return scordiPaymentMethodApi
            .create(orgId, data)
            .then((res) => res.data)
            .finally(() => setReqBody(data));
    };

    return {
        isLoaded,
        isAuthSuccess,
        authKey,
        customerKey,
        createPaymentMethod,
    };
};
