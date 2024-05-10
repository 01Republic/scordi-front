import {Fragment, memo} from 'react';
import {RadioSelectGroup} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/_common/RadioSelectGroup';
import {ProductDto} from '^models/Product/type';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {Transition} from '@headlessui/react';
import {useRecoilState} from 'recoil';
import {useCurrentConnectingProduct} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/useCurrentConnectingProduct';
import {InputSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/InputSection';

interface PaymentPlanSelectProps {
    // product: ProductDto;
    // billingCycleType?: BillingCycleOptions;
}

export const PaymentPlanSelect = memo((props: PaymentPlanSelectProps) => {
    const {currentConnectingProduct} = useCurrentConnectingProduct();
    // const [billingCycleType, setBillingCycleType] = useRecoilState(billingCycleTypeAtom);

    // const show =
    //     billingCycleType && [BillingCycleOptions.Monthly, BillingCycleOptions.Yearly].includes(billingCycleType);

    return <></>;
    // if (!show) return <></>;
    //
    // return (
    //     <Transition
    //         show={show}
    //         as={Fragment}
    //         enter="transition-all ease duration-700 transform"
    //         enterFrom="opacity-0 -translate-y-full"
    //         enterTo="opacity-100 translate-y-0"
    //         leave="transition-all ease duration-1000 transform"
    //         leaveFrom="opacity-100 translate-y-0"
    //         leaveTo="opacity-0 -translate-y-full"
    //     >
    //         <InputSection title="구독 정보를 입력합니다">
    //             {currentConnectingProduct && <RadioSelectGroup plans={currentConnectingProduct.paymentPlans} />}
    //         </InputSection>
    //     </Transition>
    // );
});
PaymentPlanSelect.displayName = 'PaymentPlanSelect';
