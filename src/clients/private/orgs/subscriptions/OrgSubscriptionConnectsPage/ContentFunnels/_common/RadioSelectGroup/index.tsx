import {RadioGroup} from '@headlessui/react';
import {memo, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {SubscriptionPaymentPlanDto} from '^models/Subscription/types/paymentPlanType';

interface RadioSelectGroupProps extends WithChildren {
    plans: SubscriptionPaymentPlanDto[];
}

export const RadioSelectGroup = memo((props: RadioSelectGroupProps) => {
    const {plans} = props;
    const [selected, setSelected] = useState(plans[0]);

    return (
        <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">이용중인 플랜</RadioGroup.Label>
            <div className="space-y-2">
                {plans.map((plan, i) => (
                    <RadioGroup.Option
                        key={i}
                        value={plan}
                        className={({active, checked}) =>
                            `relative flex cursor-pointer rounded-btn border-2 px-4 py-4 focus:outline-none ${
                                !checked && active ? 'border-scordi-200' : ''
                            } ${checked ? 'border-scordi' : ''}`
                        }
                    >
                        {({active, checked}) => (
                            <>
                                <div className="flex w-full items-center gap-4">
                                    <input
                                        type="radio"
                                        name="radio-2"
                                        className="radio radio-primary"
                                        checked={checked}
                                    />
                                    <div className="flex flex-auto items-center">
                                        <div className="text-14">
                                            <RadioGroup.Label as="p" className={`font-medium text-gray-900`}>
                                                {plan.name}
                                            </RadioGroup.Label>
                                            {/*<RadioGroup.Description as="span" className={`inline text-gray-500`}>*/}
                                            {/*    <span>*/}
                                            {/*        {plan.ram}/{plan.cpus}*/}
                                            {/*    </span>{' '}*/}
                                            {/*    <span aria-hidden="true">&middot;</span> <span>{plan.disk}</span>*/}
                                            {/*</RadioGroup.Description>*/}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
});
RadioSelectGroup.displayName = 'RadioSelectGroup';
