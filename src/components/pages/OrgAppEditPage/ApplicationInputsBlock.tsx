import React, {memo, useEffect, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {ApplicationDto, ConnectStatus, t_ConnectStatus, UpdateApplicationRequestDto} from '^types/application.type';
import {TitleSection} from '^components/v2/TitleSection';
import {UseFormReturn} from 'react-hook-form';
import {useApplication} from '^hooks/useApplications';
import {MobileSection} from '^components/v2/MobileSection';
import {MobileKeyValueItem} from '^components/v2/MobileKeyValueItem';
import {Select2} from '^components/Select2';
import {Select} from '^components/Select';
import {ApplicationBillingCycleDto, t_BillingCycleTerm} from '^types/applicationBillingCycle.type';

type AppNextPayInputsBlockProps = {
    form: UseFormReturn<UpdateApplicationRequestDto, any>;
};

export const ApplicationInputsBlock = memo((props: AppNextPayInputsBlockProps) => {
    const {form} = props;
    const application = useApplication();
    const [billingCycles, setBillingCycles] = useState<ApplicationBillingCycleDto[]>([]);

    if (!application) return <></>;

    const {prototype} = application;
    const {paymentPlans} = prototype;

    const onPlanChange = (planId: number) => {
        form.setValue('paymentPlanId', planId);
        const plan = paymentPlans.find((plan) => plan.id === planId);
        const cycles = plan?.billingCycles || [];
        setBillingCycles(cycles);
        const cycle = cycles.find((cycle) => cycle.id === form.getValues('billingCycleId'));
        cycle ? form.setValue('billingCycleId', cycle.id) : form.resetField('billingCycleId');
    };

    useEffect(() => {
        onPlanChange(application.paymentPlanId);
    }, [application]);

    return (
        <>
            <MobileSection className="pb-3 border-b-8">
                <TitleSection.Title size="lg" className="text-right mb-3">
                    <div className="text-base font-medium">Next {application.nextBillingDate}</div>
                    <div>US${application.nextBillingAmount.toLocaleString()}</div>
                </TitleSection.Title>
            </MobileSection>

            <MobileSection className="py-3 border-b-8">
                <MobileKeyValueItem label="결제플랜">
                    <div className="form-control w-1/2 max-w-xs px-3">
                        <Select className="select max-w-xs" onChange={(e) => onPlanChange(Number(e.target.value))}>
                            {paymentPlans.map((plan, i) => (
                                <option key={i} value={plan.id}>
                                    {plan.name}
                                </option>
                            ))}
                        </Select>
                    </div>
                </MobileKeyValueItem>

                <MobileKeyValueItem label="결제주기">
                    <div className="form-control w-1/2 max-w-xs px-3">
                        <Select
                            className="select max-w-xs"
                            onChange={(e) => form.setValue('billingCycleId', Number(e.target.value))}
                        >
                            {billingCycles.map((cycle, i) => (
                                <option key={i} value={cycle.id}>
                                    {t_BillingCycleTerm(cycle.term, true)}
                                </option>
                            ))}
                        </Select>
                    </div>
                </MobileKeyValueItem>
            </MobileSection>

            <MobileSection className="py-3 border-b-8">
                <MobileKeyValueItem label="연동서비스 내 조직이름">
                    <div className="form-control w-1/2 max-w-xs px-3">
                        <input
                            type="text"
                            className="input input-underline text-right px-1"
                            {...form.register('displayName')}
                        />
                        <span></span>
                    </div>
                </MobileKeyValueItem>

                <MobileKeyValueItem label="프리티어 여부">
                    <div className="form-control w-1/2 max-w-xs">
                        <label className="cursor-pointer label px-3 text-right">
                            <input
                                type="checkbox"
                                className="toggle toggle-primary ml-auto"
                                {...form.register('isFreeTier')}
                            />
                        </label>
                    </div>
                </MobileKeyValueItem>

                <MobileKeyValueItem label="사용시작일">
                    <div className="form-control w-1/2 max-w-xs px-3">
                        <input
                            type="date"
                            className="input input-underline text-right px-1"
                            {...form.register('registeredAt')}
                        />
                        <span></span>
                    </div>
                </MobileKeyValueItem>

                <MobileKeyValueItem label="결제되는 사용자 수">
                    <div className="form-control w-1/2 max-w-xs px-3">
                        <input
                            type="number"
                            className="input input-underline text-right px-1"
                            {...form.register('paidMemberCount')}
                        />
                        <span></span>
                    </div>
                </MobileKeyValueItem>

                <MobileKeyValueItem label="사용중인 사용자 수">
                    <div className="form-control w-1/2 max-w-xs px-3">
                        <input
                            type="number"
                            className="input input-underline text-right px-1"
                            {...form.register('usedMemberCount')}
                        />
                        <span></span>
                    </div>
                </MobileKeyValueItem>

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
