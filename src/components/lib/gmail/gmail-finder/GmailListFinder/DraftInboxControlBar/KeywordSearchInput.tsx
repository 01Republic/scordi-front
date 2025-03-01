import React, {memo} from 'react';
import {FaSearch} from '@react-icons/all-files/fa/FaSearch';

interface KeywordSearchInputProps {
    defaultValue?: string;
    onSubmit?: (value: string) => any;
}

export const KeywordSearchInput = memo((props: KeywordSearchInputProps) => {
    const {defaultValue, onSubmit} = props;

    return (
        <div className="w-3/6 relative">
            <div className="absolute top-0 bottom-0 left-2.5 flex items-center justify-center">
                <FaSearch fontSize={12} />
            </div>
            <input
                type="text"
                className="input w-full input-bordered input-sm pl-8"
                placeholder={`from:someuser@example.com is:unread`}
                defaultValue={defaultValue}
                onKeyUp={(e) => {
                    const value = e.target.value;
                    if (e.code === 'Enter') {
                        onSubmit && onSubmit(value);
                    }
                }}
            />
        </div>
    );
});
KeywordSearchInput.displayName = 'KeywordSearchInput';
