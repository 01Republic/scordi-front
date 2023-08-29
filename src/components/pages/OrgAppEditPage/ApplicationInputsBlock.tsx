import React, {memo, useEffect, useState} from 'react';
import {UpdateSubscriptionRequestDto} from '^types/subscription.type';
import {TitleSection} from '^components/v2/TitleSection';
import {UseFormReturn} from 'react-hook-form';
import {useCurrentSubscription} from '^hooks/useSubscriptions';
import {MobileSection} from '^components/v2/MobileSection';
import {MobileKeyValueItem} from '^components/v2/MobileKeyValueItem';
import {Select} from '^components/Select';
import {SubscriptionBillingCycleDto, t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {toast} from 'react-toastify';

type AppNextPayInputsBlockProps = {
    form: UseFormReturn<UpdateSubscriptionRequestDto, any>;
};

export const ApplicationInputsBlock = memo((props: AppNextPayInputsBlockProps) => {
    const {form} = props;
    const {currentSubscription: subscription} = useCurrentSubscription();
    const [cycleOptions, setCycleOptions] = useState<SubscriptionBillingCycleDto[]>([]);

    if (!subscription) return <></>;

    const {product} = subscription;
    const {paymentPlans} = product;

    const onPlanChange = (planId: number) => {
        // form.setValue('paymentPlanId', planId);
        const plan = paymentPlans.find((plan) => plan.id === planId);
        const cyclesOfNewPlan = plan?.billingCycles || [];
        const cycle = cyclesOfNewPlan.find((cycle) => cycle.id === subscription.billingCycleId) || cyclesOfNewPlan[0];
        if (cycle) {
            // form.setValue('billingCycleId', cycle.id);
            console.log({plan, cycle});
        } else {
            toast.error('결제주기를 불러올 수 없습니다.');
        }
        setCycleOptions(cyclesOfNewPlan);
    };

    useEffect(() => {
        // onPlanChange(subscription.paymentPlanId);
    }, [subscription]);

    return (
        <>
            <MobileSection className="pb-3 border-b-8">
                <TitleSection.Title size="lg" className="text-right mb-3">
                    <div className="text-base font-medium">Next {subscription.nextBillingDate}</div>
                    <div>US${subscription.nextBillingAmount.toLocaleString()}</div>
                </TitleSection.Title>
            </MobileSection>

            <MobileSection className="py-3 border-b-8">
                {/*<MobileKeyValueItem label="결제플랜">*/}
                {/*    <div className="form-control w-1/2 max-w-xs px-3">*/}
                {/*        <Select className="select max-w-xs" onChange={(e) => onPlanChange(Number(e.target.value))}>*/}
                {/*            {paymentPlans.map((plan, i) => (*/}
                {/*                <option key={i} value={plan.id} selected={form.getValues('paymentPlanId') == plan.id}>*/}
                {/*                    {plan.name}*/}
                {/*                </option>*/}
                {/*            ))}*/}
                {/*        </Select>*/}
                {/*    </div>*/}
                {/*</MobileKeyValueItem>*/}

                {/*<MobileKeyValueItem label="결제주기">*/}
                {/*    <div className="form-control w-1/2 max-w-xs px-3">*/}
                {/*        <Select*/}
                {/*            className="select max-w-xs"*/}
                {/*            onChange={(e) => form.setValue('billingCycleId', Number(e.target.value))}*/}
                {/*        >*/}
                {/*            {cycleOptions.map((cycle, i) => (*/}
                {/*                <option*/}
                {/*                    key={i}*/}
                {/*                    value={cycle.id}*/}
                {/*                    selected={form.getValues('billingCycleId') == cycle.id}*/}
                {/*                >*/}
                {/*                    {t_BillingCycleTerm(cycle.term, true)}*/}
                {/*                </option>*/}
                {/*            ))}*/}
                {/*        </Select>*/}
                {/*    </div>*/}
                {/*</MobileKeyValueItem>*/}
            </MobileSection>

            <MobileSection className="py-3 border-b-8">
                <MobileKeyValueItem label="연동서비스 내 조직이름">
                    <div className="form-control w-1/2 max-w-xs px-3">
                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    className="input input-underline text-right px-1"*/}
                        {/*    {...form.register('displayName')}*/}
                        {/*/>*/}
                        <span></span>
                    </div>
                </MobileKeyValueItem>

                {/*<MobileKeyValueItem label="프리티어 여부">*/}
                {/*    <div className="form-control w-1/2 max-w-xs">*/}
                {/*        <label className="cursor-pointer label px-3 text-right">*/}
                {/*            <input*/}
                {/*                type="checkbox"*/}
                {/*                className="toggle toggle-primary ml-auto"*/}
                {/*                {...form.register('isFreeTier')}*/}
                {/*            />*/}
                {/*        </label>*/}
                {/*    </div>*/}
                {/*</MobileKeyValueItem>*/}

                {/*<MobileKeyValueItem label="사용시작일">*/}
                {/*    <div className="form-control w-1/2 max-w-xs px-3">*/}
                {/*        <input*/}
                {/*            type="date"*/}
                {/*            className="input input-underline text-right px-1"*/}
                {/*            {...form.register('registeredAt')}*/}
                {/*        />*/}
                {/*        <span></span>*/}
                {/*    </div>*/}
                {/*</MobileKeyValueItem>*/}

                {/*<MobileKeyValueItem label="사용중인 사용자 수">*/}
                {/*    <div className="form-control w-1/2 max-w-xs px-3">*/}
                {/*        <input*/}
                {/*            type="number"*/}
                {/*            className="input input-underline text-right px-1"*/}
                {/*            {...form.register('usedMemberCount')}*/}
                {/*        />*/}
                {/*        <span></span>*/}
                {/*    </div>*/}
                {/*</MobileKeyValueItem>*/}

                {/*<MobileKeyValueItem label="결제되는 사용자 수">*/}
                {/*    <div className="form-control w-1/2 max-w-xs px-3">*/}
                {/*        <input*/}
                {/*            type="number"*/}
                {/*            className="input input-underline text-right px-1"*/}
                {/*            {...form.register('paidMemberCount')}*/}
                {/*        />*/}
                {/*        <span></span>*/}
                {/*    </div>*/}
                {/*</MobileKeyValueItem>*/}

                {/*<MobileKeyValueItem label="연동상태">*/}
                {/*    <div className="form-control w-1/2 max-w-xs px-3">*/}
                {/*        <Select*/}
                {/*            className="select select-ghost max-w-xs"*/}
                {/*            onChange={(e) => form.setValue('connectStatus', e.target.value as ConnectStatus)}*/}
                {/*        >*/}
                {/*            {Object.values(ConnectStatus).map((statusValue, i) => (*/}
                {/*                <option key={i} value={statusValue}>*/}
                {/*                    {t_ConnectStatus(statusValue)}*/}
                {/*                </option>*/}
                {/*            ))}*/}
                {/*        </Select>*/}
                {/*    </div>*/}
                {/*</MobileKeyValueItem>*/}
            </MobileSection>
        </>
    );
});
