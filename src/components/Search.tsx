import React, {FC, InputHTMLAttributes, useRef} from 'react';
import {Icon} from './Icon';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
    onSearch?: () => void;
}

export const Search: FC<SearchProps> = ({value, onSearch = () => {}, ...props}) => {
    const input = useRef<HTMLInputElement>(null);

    return (
        <div className="flex justify-end">
            <form
                className="flex h-10 w-96 items-center rounded-md border border-gray-200 px-4 shadow-sm focus-within:border-gray-900"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSearch();
                }}
            >
                <input ref={input} className="flex-1 text-sm placeholder-gray-400" value={value} {...props} />
                <div className="w-10 h-10 -ml-2 flex items-center justify-center">
                    <Icon.Search />
                </div>
                {value && (
                    <div className="w-10 h-10 -mr-2 flex items-center justify-center">
                        <Icon.X
                            className="w-4 h-4"
                            onClick={() => {
                                Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set?.call(
                                    input.current,
                                    '',
                                );
                                input.current?.dispatchEvent(new Event('change', {bubbles: true}));
                            }}
                        />
                    </div>
                )}
            </form>
        </div>
    );
};
