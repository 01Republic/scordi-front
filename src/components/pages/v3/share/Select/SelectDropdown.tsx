import {memo, useCallback, useEffect, useState} from 'react';
import {SelectContainer} from './SelectContainer';
import {SelectOption, SelectOptionProps} from './SelectOption';

interface SelectDropdownProps {
    placeholder?: string;
    options: {value: any; text: string; selected: boolean}[];
    onChange: (option: SelectOptionProps) => any;
}

export const SelectDropdown = memo((props: SelectDropdownProps) => {
    const {placeholder = '-', options, onChange} = props;
    const [currentOption, setCurrentOption] = useState<SelectOptionProps | null>(null);

    useEffect(() => {
        const option = options.find((opt) => opt.selected);
        if (option) setCurrentOption(option);
    }, [options]);

    const onClick = useCallback(
        (value: any) => {
            const selectedOption = options.find((o) => o.value === value);
            if (!selectedOption) return false;
            if (selectedOption.value === currentOption?.value) return false;

            onChange(selectedOption);
            setCurrentOption(selectedOption);
            return false;
        },
        [options, currentOption],
    );

    return (
        <SelectContainer currentVal={currentOption?.text || options[0].text || placeholder} isNotSelected={false}>
            {options.map((option, i) => {
                const selected = option.value === currentOption?.value;
                return <SelectOption key={i} {...option} selected={selected} onSelect={onClick} />;
            })}
        </SelectContainer>
    );
});
