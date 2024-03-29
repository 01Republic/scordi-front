import React, {memo} from 'react';
import {TextInput} from '^components/TextInput';
import {CheckBoxInput} from '../SearchProductPanel/CheckBoxInput';
import {plainToast as toast} from '^hooks/useToast';

interface InputProps<T> {
    value: T;
    onChange: (value: T) => any;
}

interface ConditionLikeInputGroupProps {
    isLoading: boolean;
    fo: InputProps<boolean | undefined>;
    bo: InputProps<boolean | undefined>;
    value: InputProps<string | undefined>;
}

export const ConditionLikeInputGroup = memo((props: ConditionLikeInputGroupProps) => {
    const {isLoading, fo, bo, value} = props;

    const stopPropagation = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();

            if (isLoading) {
                toast('이미 진행중입니다. 잠시 뒤에 시도해주세요.');
                return;
            }

            if (!isLoading && e.target.tagName === 'INPUT') {
                value.onChange(value.value);
                const input = e.target as HTMLInputElement;
                input.value = value.value || '';
            }
        }
        return;
    };

    return (
        <div onKeyDown={stopPropagation}>
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <CheckBoxInput label="전방탐색 (가급적x)" defaultValue={fo.value} onChange={fo.onChange} />
                    <CheckBoxInput label="후방탐색 (가급적o)" defaultValue={bo.value} onChange={bo.onChange} />
                </div>

                <p className="flex items-center gap-4">
                    <span>
                        완성된 SQL:{' '}
                        <code className="rounded text-12 py-0.5 px-1 bg-pink-100 text-red-700">
                            '{fo.value ? '%' : ''}
                            {value.value}
                            {bo.value ? '%' : ''}'
                        </code>
                    </span>
                </p>
            </div>
            <TextInput required={true} defaultValue={value.value} onChange={(e) => value.onChange(e.target.value)} />
        </div>
    );
});
ConditionLikeInputGroup.displayName = 'ConditionLikeInputGroupProps';
