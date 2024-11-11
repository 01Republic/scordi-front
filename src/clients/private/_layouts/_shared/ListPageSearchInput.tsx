import React, {memo, useState} from 'react';
import {FaSearch} from 'react-icons/fa';

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
                className="input input-bordered input-sm w-full pr-[40px]"
                placeholder={placeholder}
                defaultValue={val}
                onChange={(e) => {
                    const value = e.target.value.trim();
                    setVal(value);
                    onSearch && onSearch(value);
                }}
            />
            <FaSearch className="absolute my-auto top-0 bottom-0 right-3" onClick={() => onSearch && onSearch(val)} />
        </label>
    );
});
ListPageSearchInput.displayName = 'ListPageSearchInput';
