import {memo} from 'react';
import Select, {SingleValue, StylesConfig} from 'react-select';
import {
    c_SubscriptionMeasureMethod,
    RecurringTypeOptions,
    SubscriptionMeasureMethodValues,
    t_SubscriptionMeasureMethod,
} from '^models/Subscription/types/RecurringTypeOptions';
import {useRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';

type RecurringTypeOption = {
    label: string;
    value: RecurringTypeOptions;
    className: string;
};

const toOption = (value: RecurringTypeOptions): RecurringTypeOption => {
    const label = t_SubscriptionMeasureMethod(value);
    const className = c_SubscriptionMeasureMethod(value);
    return {label, value, className};
};

export const RecurringTypeSelect = memo(function RecurringTypeSelect() {
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);

    const onChange = (recurringType: RecurringTypeOptions) => {
        setFormData((f) => ({...f, recurringType}));
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
            defaultValue={formData.recurringType ? toOption(formData.recurringType) : undefined}
            onChange={(option) => {
                option ? onChange(option.value) : onChange(RecurringTypeOptions.NONE);
            }}
            className="input input-bordered px-0"
        />
    );
});
