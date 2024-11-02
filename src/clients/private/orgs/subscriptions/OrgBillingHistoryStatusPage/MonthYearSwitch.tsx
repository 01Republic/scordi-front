import {memo} from 'react';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';

interface MonthYearSwitchProps {
    defaultValue: BillingCycleOptions;
    onChange?: (value: BillingCycleOptions) => any;
}

export const MonthYearSwitch = memo((props: MonthYearSwitchProps) => {
    const {defaultValue, onChange} = props;

    const options = [
        {label: '월별', value: BillingCycleOptions.Monthly},
        {label: '연도별', value: BillingCycleOptions.Yearly},
    ];

    return (
        <div className="w-full grid grid-cols-2 gap-1 bg-gray-100 rounded-[0.5rem] p-1">
            {options.map((option, i) => (
                <button
                    key={i}
                    type="button"
                    onClick={() => onChange && onChange(option.value)}
                    className={`btn btn-sm rounded-[0.5rem] border-0 no-animation ${
                        option.value === defaultValue
                            ? 'bg-white hover:bg-white shadow-lg'
                            : 'bg-transparent hover:bg-transparent text-gray-400 hover:text-gray-600'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
});
MonthYearSwitch.displayName = 'MonthYearSwitch';
