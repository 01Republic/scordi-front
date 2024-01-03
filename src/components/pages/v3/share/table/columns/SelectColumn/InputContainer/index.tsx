import {memo, RefObject} from 'react';
import {WithChildren} from '^types/global.type';
import {debounce} from 'lodash';

interface InputContainerProps<T> extends WithChildren {
    inputRef: RefObject<HTMLInputElement>;
    onChange: (keyword?: string) => any;
    defaultValue?: string;
}

export const InputContainer = <T,>(props: InputContainerProps<T>) => {
    const {inputRef, onChange: _onChange, defaultValue, children} = props;

    const onChange = debounce((keyword?: string) => {
        _onChange(keyword);
    }, 500);

    return (
        <div className="bg-gray-300 bg-opacity-30 px-[9px] pt-[8px] pb-[1px] text-[12px] flex items-start flex-wrap gap-1.5 min-h-[34px]">
            {children}
            <input
                ref={inputRef}
                type="text"
                data-focusable="true"
                className="w-full flex-1 bg-transparent"
                defaultValue={defaultValue}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};
InputContainer.displayName = 'InputContainer';
