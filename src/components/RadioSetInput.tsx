import React, { ChangeEvent, ForwardedRef, forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import { Radio } from '^components/Radio';
import { RadioGroup } from '^components/RadioGroup';

export type RadioSetInputProps<T extends any> = InputHTMLAttributes<HTMLInputElement> & {
  options: [key: string, val: T][];
  name: string;
}

export const RadioSetInput = forwardRef(function render<T extends any>(props: RadioSetInputProps<T>, ref: ForwardedRef<any>) {
  const { options, onChange, defaultValue = options[0][1], ...etcProps } = props;
  const [checkedValue, setCheckedValue] = useState<any>();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckedValue((e.target.value));
    if (onChange) onChange(e);
  }

  useEffect(() => {
    setCheckedValue(defaultValue);
  }, [defaultValue]);

  return (
    <RadioGroup ref={ref} className="capitalize" {...etcProps} onChange={onChangeHandler}>
      {options.map(([k, v], i) => {
        return (
          <Radio
            key={i}
            label={k}
            value={v as any}
            checked={checkedValue ? (String(checkedValue) === String(v)) : (defaultValue === v)}
          />
        )
      })}
    </RadioGroup>
  )
});
