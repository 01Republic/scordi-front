import {memo} from 'react';
import Select, {SingleValue, StylesConfig} from 'react-select';
import {
    c_SubscriptionMeasureMethod,
    PricingModelOptions,
    SubscriptionMeasureMethodValues,
    t_SubscriptionPricingModel,
} from '^models/Subscription/types/PricingModelOptions';
import {useRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';

type RecurringTypeOption = {
    label: string;
    value: PricingModelOptions;
    className: string;
};

const toOption = (value: PricingModelOptions): RecurringTypeOption => {
    const label = t_SubscriptionPricingModel(value);
    const className = c_SubscriptionMeasureMethod(value);
    return {label, value, className};
};

export const RecurringTypeSelect = memo(function RecurringTypeSelect() {
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);

    const onChange = (pricingModel: PricingModelOptions) => {
        setFormData((f) => ({...f, pricingModel}));
    };

    const customStyles: StylesConfig<RecurringTypeOption, false> = {
        control: (base) => ({
            ...base,
            height: '100%',
            border: 'none',
            borderRadius: 'inherit',
            '&:hover': {},
        }),
    };

    return (
        <Select
            options={SubscriptionMeasureMethodValues.map(toOption)}
            placeholder=""
            styles={customStyles}
            defaultValue={formData.pricingModel ? toOption(formData.pricingModel) : undefined}
            onChange={(option) => {
                option ? onChange(option.value) : onChange(PricingModelOptions.NONE);
            }}
            className="input input-bordered px-0"
        />
    );
});
