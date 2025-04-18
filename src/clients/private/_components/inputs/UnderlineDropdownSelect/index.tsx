import React, {Fragment, memo, useState} from 'react';
import {Check, ChevronDown, X} from 'lucide-react';
interface UnderlineDropdownSelectProps<T> {
    name?: string;
    defaultValue?: T;
    options?: T[];
    toComponent?: (option: T) => JSX.Element;
    onChange?: (option?: T) => any;

    // 옵션 중 기존의 값이 없을 때
    // 드롭다운 Trigger 에서 보여 줄 기본 UI
    // (기본값: "비어있음")
    EmptyComponent?: () => JSX.Element;

    valueOfOption?: (option: T) => any;

    clearable?: boolean;

    maxHeight?: string;

    className?: string;
}

export const UnderlineDropdownSelect = <T,>(props: UnderlineDropdownSelectProps<T>) => {
    const {
        name,
        options = [],
        toComponent,
        onChange,
        EmptyComponent,
        clearable = false,
        maxHeight = '400px',
        className = '',
    } = props;
    const [selectedOption, setSelectedOption] = useState<T | undefined>(props.defaultValue);
    const valueOfOption = props.valueOfOption || ((option: T) => option);
    const selectedValue = typeof selectedOption !== 'undefined' ? valueOfOption(selectedOption) : undefined;

    const selectOption = (option?: T) => {
        onChange && onChange(option);
        setSelectedOption(option);
    };

    return (
        <div className="dropdown dropdown-bottom dropdown-enter w-full">
            {name && <input type="hidden" name={name} value={selectedValue} />}
            <div className="w-full">
                <div
                    tabIndex={0}
                    className={`input input-underline !bg-slate-100 w-full flex items-center justify-between ${className}`}
                >
                    <div className="flex-auto">
                        {typeof selectedOption !== 'undefined' &&
                            (toComponent ? toComponent(selectedOption) : `${selectedValue}`)}
                    </div>

                    <div className="flex items-center gap-2">
                        {typeof selectedOption !== 'undefined' && clearable && (
                            <X
                                fontSize={16}
                                className="text-gray-300 hover:text-gray-400 transition-all cursor-pointer"
                                onClick={() => selectOption(undefined)}
                            />
                        )}

                        <ChevronDown fontSize={12} className="text-gray-500" />
                    </div>
                </div>
                <span />
            </div>

            <div
                className={`dropdown-content block left-0 right-0 menu px-0 py-1 max-h-[${maxHeight}] overflow-auto no-scrollbar shadow-xl bg-white border rounded-md !z-[1] text-14`}
            >
                {options.map((option, i) => {
                    const value = valueOfOption(option);
                    const isSelected = selectedValue === value;

                    return (
                        <div
                            tabIndex={0}
                            key={i}
                            className="px-4 min-h-[2rem] flex items-center justify-between cursor-pointer group hover:bg-gray-100 transition-all"
                            onClick={() => selectOption(option)}
                        >
                            <div className="flex-auto">{toComponent ? toComponent(option) : `${value}`}</div>

                            <div>{isSelected && <Check fontSize={16} className="text-green-500" />}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
