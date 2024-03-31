import React, {memo} from 'react';
import {TextInput} from '^components/TextInput';
import {plainToast as toast} from '^hooks/useToast';

interface ConditionEqualInputGroupProps {
    isLoading: boolean;
    value: string;
    onChange: (value: string) => any;
}

export const ConditionEqualInputGroup = memo((props: ConditionEqualInputGroupProps) => {
    const {isLoading, value, onChange} = props;

    const stopPropagation = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();

            if (isLoading) {
                toast('이미 진행중입니다. 잠시 뒤에 시도해주세요.');
                return;
            }

            if (!isLoading && e.target.tagName === 'INPUT') {
                onChange(value);
                const input = e.target as HTMLInputElement;
                input.value = value || '';
            }
        }
        return;
    };

    return (
        <div onKeyDown={stopPropagation}>
            <div className="flex items-center justify-between">
                <div></div>
                <div className="flex items-center gap-4">
                    <span>
                        완성된 SQL:{' '}
                        <code className="rounded text-12 py-0.5 px-1 bg-pink-100 text-red-700">'{value}'</code>
                    </span>
                </div>
            </div>
            <TextInput required={true} defaultValue={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
});
ConditionEqualInputGroup.displayName = 'ConditionEqualInputGroup';
