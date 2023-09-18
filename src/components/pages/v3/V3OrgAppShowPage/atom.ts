import {atom, useRecoilState} from 'recoil';
import {SubscriptionDto} from '^types/subscription.type';
import {billingTypeToCycleTerm, InvoiceAppDto, t_BillingType} from '^types/invoiceApp.type';
import {getSubscription} from '^api/subscription.api';
import {invoiceAppApi} from '^api/invoiceApp.api';
import {Locale, SubscriptionBillingCycleDto, t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {useRouter} from 'next/router';

const currentAppState = atom<SubscriptionDto | InvoiceAppDto | null>({
    key: 'currentApp',
    default: null,
});

const currentAppLoadingState = atom<boolean>({
    key: 'currentAppLoadingState',
    default: false,
});

export type AppTypeQuery = 'InvoiceApp' | 'Subscription';

export const useCurrentApp = () => {
    const router = useRouter();
    const [currentApp, setCurrentApp] = useRecoilState(currentAppState);
    const [isLoading, setIsLoading] = useRecoilState(currentAppLoadingState);

    const loadCurrentApp = (organizationId: number, id: number, appType: AppTypeQuery) => {
        setIsLoading(true);
        const request = appType === 'Subscription' ? getSubscription(id) : invoiceAppApi.show(organizationId, id);
        request.then((res) => setCurrentApp(res.data)).finally(() => setIsLoading(false));
    };

    const appType: AppTypeQuery | null = currentApp
        ? Object.hasOwn(currentApp, 'billingType')
            ? 'InvoiceApp'
            : 'Subscription'
        : null;

    const getBillingType = (standalone = false) => {
        if (!currentApp) return '';

        const locale = (router.locale as Locale) || Locale.ko;
        const cycleTerm = Object.hasOwn(currentApp, 'billingType')
            ? billingTypeToCycleTerm((currentApp as InvoiceAppDto).billingType)
            : (((currentApp as SubscriptionDto).billingCycle || {}) as SubscriptionBillingCycleDto).term;

        return t_BillingCycleTerm(cycleTerm, standalone, locale) || '?';
    };

    return {currentApp, loadCurrentApp, isLoading, getBillingType, appType};
};
