import React, {forwardRef, SelectHTMLAttributes} from 'react';
import {useId} from 'react-id-generator';
import {Label} from './Label';
import Select, {StylesConfig, Options} from 'react-select';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    helper?: string;
}

/**
 * @example
 * <Select label="Select" onChange={(e) => console.log(e.target.value)}>
 *   <option disabled selected hidden>placeholder</option>
 *   <option value="1">option 1</option>
 *   <option value="2">option 2</option>
 *   <option value="3">option 3</option>
 * </Select>
 */
interface Select2Props {
    options: Options<{label: string; value: any}>;
    control?: any;
}

// 잠재적인 에러가 무시되어있는 컴포넌트 입니다. 가능한 사용하지 말아주세요.
export const Select2 = forwardRef<HTMLSelectElement, SelectProps & Select2Props>(
    ({options, className = '', label, helper, ...props}, ref) => {
        const [id] = useId(1, 'select');
        const customStyles: StylesConfig = {
            // @ts-ignore
            control: (base, state) => ({
                ...base,
                width: '100%',
                height: '3rem',
                borderRadius: 'var(--rounded-btn, 0.5rem)',
                '&:hover': {},
            }),
        };

        return (
            <div className="label-col">
                {label && <Label htmlFor={id} text={label} />}
                {/* @ts-ignore */}
                <Select
                    id={id}
                    // name={name}
                    // control={control}
                    className={`${helper ? 'border-error' : ''} ${className}`}
                    styles={customStyles}
                    options={options}
                    {...props}
                />
                {helper && <p className="text-error text-sm">{helper}</p>}
            </div>
        );
    },
);
