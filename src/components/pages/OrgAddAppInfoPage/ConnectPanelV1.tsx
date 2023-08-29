import React from 'react';
import {ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout/ContentPanel';
import {SwitchCheckbox} from '^components/SwitchCheckbox';
import {RadioSetInput} from '^components/RadioSetInput';
import {t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {TextInput} from '^components/TextInput';
import {ProductDto} from '^types/product.type';
import {CreateApplicationRequestDto} from '^types/subscription.type';
import {UseFormReturn} from 'react-hook-form';
import {SubscriptionPaymentPlanDto} from '^types/subscriptionPaymentPlan.type';

interface ConnectPanelV1Props {
    form: UseFormReturn<CreateApplicationRequestDto, any>;
    protoApp: ProductDto;
    selectedPlan: SubscriptionPaymentPlanDto;
    setSelectedPlanId: React.Dispatch<React.SetStateAction<number>>;
}

export const ConnectPanelV1 = (props: ConnectPanelV1Props) => {
    const {form, protoApp, selectedPlan, setSelectedPlanId} = props;

    return (
        <ContentPanel title="Set more details ...">
            <ContentPanelList>
                {/*<ContentPanelInput*/}
                {/*    title="프리티어 여부"*/}
                {/*    text="현재 이 서비스를 무료로 사용하고 계신가요?"*/}
                {/*    required={true}*/}
                {/*>*/}
                {/*    <SwitchCheckbox {...form.register('isFreeTier')} />*/}
                {/*</ContentPanelInput>*/}

                {/*<ContentPanelInput*/}
                {/*    title="결제플랜"*/}
                {/*    text="어느 플랜으로 이용중이세요? <br>잘 모르겠다면 <b>Team</b> 을 선택해주세요! <br>(안심하세요, 잘못 입력했더라도 연동이 완료되면 자동으로 올바른 값으로 고쳐드려요!)"*/}
                {/*    required={true}*/}
                {/*>*/}
                {/*    <RadioSetInput*/}
                {/*        options={protoApp.paymentPlans.map((plan) => [plan.name, plan.id])}*/}
                {/*        {...form.register('paymentPlanId', {required: true})}*/}
                {/*        defaultValue={form.getValues('paymentPlanId')}*/}
                {/*        onChange={(e) => {*/}
                {/*            const paymentPlanId = Number(e.target.value);*/}
                {/*            const plan = protoApp.paymentPlans.find(({id}) => id === paymentPlanId)!;*/}
                {/*            form.setValue('paymentPlanId', paymentPlanId);*/}
                {/*            form.setValue('billingCycleId', plan.billingCycles[0].id);*/}
                {/*            setSelectedPlanId(paymentPlanId);*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</ContentPanelInput>*/}

                {/*<ContentPanelInput title="결제주기" text="해당하는 결제주기를 선택해주세요." required={true}>*/}
                {/*    <RadioSetInput*/}
                {/*        options={*/}
                {/*            selectedPlan!.billingCycles.map((cycle) => [*/}
                {/*                `${t_BillingCycleTerm(cycle.term)}`,*/}
                {/*                cycle.id,*/}
                {/*            ]) || [['발행되지 않음', 0]]*/}
                {/*        }*/}
                {/*        {...form.register('billingCycleId', {required: true})}*/}
                {/*        defaultValue={form.getValues('billingCycleId')}*/}
                {/*        onChange={(e) => form.setValue('billingCycleId', Number(e.target.value))}*/}
                {/*    />*/}
                {/*</ContentPanelInput>*/}

                {/*<ContentPanelInput title="사용 시작일" text="서비스를 언제부터 사용하셨나요?" required={true}>*/}
                {/*    <TextInput*/}
                {/*        type="date"*/}
                {/*        {...form.register('registeredAt', {required: true})}*/}
                {/*        defaultValue={form.getValues('registeredAt') as string}*/}
                {/*    />*/}
                {/*</ContentPanelInput>*/}
            </ContentPanelList>
        </ContentPanel>
    );
};
