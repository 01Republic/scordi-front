import React, {memo, useState} from 'react';
import {TextInput} from '^components/TextInput';
import {useSearchProductInCodefCardParser} from '^admin/factories/codef-card-parsers/hooks';

interface SearchProductInputProps {
    readOnly?: boolean;
}

export const SearchProductInput = memo((props: SearchProductInputProps) => {
    const {readOnly = false} = props;
    const [keyword, setKeyword] = useState('');
    const {query, search} = useSearchProductInCodefCardParser();

    const onChange = (value: string) => {
        if (keyword === value) return;
        setKeyword(value);
        console.log({keyword, value});
        search(
            {
                where: {},
                keyword: encodeURI(value),
                order: {id: 'DESC'},
                itemsPerPage: 10,
            },
            false,
            true,
        );
    };

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
                    defaultValue={keyword || query.keyword || ''}
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
