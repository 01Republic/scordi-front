import {atom, useRecoilState} from 'recoil';
import {SubscriptionDto} from '^types/subscription.type';
import {getBillingType, InvoiceAppDto, t_BillingType} from '^types/invoiceApp.type';
import {getSubscription} from '^api/subscription.api';
import {invoiceAppApi} from '^api/invoiceApp.api';
import {SubscriptionBillingCycleDto, t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';

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
    const [currentApp, setCurrentApp] = useRecoilState(currentAppState);
    const [isLoading, setIsLoading] = useRecoilState(currentAppLoadingState);

    const loadCurrentApp = (organizationId: number, id: number, appType: AppTypeQuery) => {
        setIsLoading(true);
        const request = appType === 'Subscription' ? getSubscription(id) : invoiceAppApi.show(organizationId, id);
        request.then((res) => setCurrentApp(res.data)).finally(() => setIsLoading(false));
    };

    const getBillingType = () => {
        if (!currentApp) return '';

        if (Object.hasOwn(currentApp, 'billingType')) {
            return t_BillingType((currentApp as InvoiceAppDto).billingType) || '?';
        } else {
            const cycle = ((currentApp as SubscriptionDto).billingCycle || {}) as SubscriptionBillingCycleDto;
            return t_BillingCycleTerm(cycle.term) || '?';
        }
    };

    return {currentApp, loadCurrentApp, isLoading, getBillingType};
};
