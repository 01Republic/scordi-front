import React, {memo, useState} from 'react';
import {TextInput} from '^components/TextInput';

interface SearchProductInputProps {
    onChange: (value: string) => any;
    keyword?: string;
    readOnly?: boolean;
}

export const SearchProductInput = memo((props: SearchProductInputProps) => {
    const {onChange, keyword, readOnly = false} = props;

    return (
        <div
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }}
        >
            <div className="flex items-center mb-4">
                <TextInput
                    required={true}
                    defaultValue={keyword || ''}
                    onChange={(e) => {
                        const value = e.target.value.trim().replaceAll('\b', '');
                        onChange(value);
                        e.target.value = value || '';
                    }}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
});
SearchProductInput.displayName = 'SearchProductInput';
