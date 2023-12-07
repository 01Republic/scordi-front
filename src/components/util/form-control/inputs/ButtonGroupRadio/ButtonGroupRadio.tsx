import React, {memo, ReactNode, useState} from 'react';
import {Group} from './Group';
import {Button} from './Button';

interface ButtonGroupRadioOption<Value> {
    label: ReactNode;
    value: Value;
}

export interface ButtonGroupRadioProps<Value extends any> {
    className?: string;
    onChange: (option: ButtonGroupRadioOption<Value>) => any;
    options: ButtonGroupRadioOption<Value>[];
    defaultValue?: Value;
}

export const ButtonGroupRadio = memo(<T,>(props: ButtonGroupRadioProps<T>) => {
    const {defaultValue, className, onChange, options} = props;
    const [selectedVal, setValue] = useState<T>((options[0] || {}).value);

    const values = options.flatMap((o) => o.value);
    const isValidValue = (v: T) => values.includes(v);

    return (
        <Group className={className}>
            {options.map((option, i) => {
                const {label, value} = option;
                const activeVal = isValidValue(selectedVal) ? selectedVal : defaultValue;
                return (
                    <Button
                        key={i}
                        onClick={() => {
                            setValue(value);
                            onChange(option);
                        }}
                        isActive={activeVal ? activeVal === value : i == 0}
                    >
                        {label}
                    </Button>
                );
            })}
        </Group>
    );
});
ButtonGroupRadio.displayName = 'ButtonGroupRadio';

// <FormControl topLeftLabel="이름">
//     <ButtonGroupRadio
//         onChange={(v) => console.log(v)}
//         options={[
//             {label: '월간', value: 1},
//             {label: '연간', value: 2},
//             {label: '일회성', value: 3},
//         ]}
//         defaultValue={2}
//     />
// </FormControl>
