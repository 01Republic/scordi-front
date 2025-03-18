import React, {memo, useState} from 'react';
import {Search} from 'lucide-react';

interface ListPageSearchInputProps {
    onSearch?: (keyword?: string) => any;
    placeholder?: string;
}

export const ListPageSearchInput = memo((props: ListPageSearchInputProps) => {
    const {placeholder = '', onSearch} = props;
    const [val, setVal] = useState('');

    return (
        <label
            className="block relative min-w-[200px]"
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    onSearch && onSearch(val);
                    e.stopPropagation();
                    e.preventDefault();
                }
            }}
        >
            <input
                type="text"
                className="input input-bordered w-full pr-[40px]"
                placeholder={placeholder}
                defaultValue={val}
                onChange={(e) => {
                    const value = e.target.value.trim();
                    setVal(value);
                    onSearch && onSearch(value);
                }}
            />
            <Search className="absolute my-auto top-0 bottom-0 right-3" onClick={() => onSearch && onSearch(val)} />
        </label>
    );
});
ListPageSearchInput.displayName = 'ListPageSearchInput';

interface ListPageSearchInputStandAloneProps {
    onSearch?: (keyword?: string) => any;
    placeholder?: string;
    className?: string;
}

export const ListPageSearchInputStandAlone = memo((props: ListPageSearchInputStandAloneProps) => {
    const {placeholder = '', onSearch, className = ''} = props;
    const [val, setVal] = useState('');

    return (
        <label
            className="block relative min-w-[200px]"
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    onSearch && onSearch(val);
                    e.stopPropagation();
                    e.preventDefault();
                }
            }}
        >
            <input
                type="text"
                className={`input input-bordered w-full pr-[40px] ${className}`}
                placeholder={placeholder}
                defaultValue={val}
                onChange={(e) => {
                    const value = e.target.value.trim();
                    setVal(value);
                    onSearch && onSearch(value);
                }}
            />
            <Search className="absolute my-auto top-0 bottom-0 right-3" onClick={() => onSearch && onSearch(val)} />
        </label>
    );
});
ListPageSearchInputStandAlone.displayName = 'ListPageSearchInputStandAlone';
