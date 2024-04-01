import React, {memo} from 'react';
import {TextInput} from '^components/TextInput';
import {CheckBoxInput} from '../SearchProductPanel/CheckBoxInput';
import {plainToast as toast} from '^hooks/useToast';

interface InputProps<T> {
    value: T;
    onChange: (value: T) => any;
}

interface ConditionRegexpInputGroupProps {
    isLoading: boolean;
    value: InputProps<string | undefined>;
}

export const ConditionRegexpInputGroup = memo((props: ConditionRegexpInputGroupProps) => {
    const {isLoading, value} = props;

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
                    <CheckBoxInput label="전방탐색 (가급적x)" onChange={console.log} disabled />
                    <CheckBoxInput label="후방탐색 (가급적o)" onChange={console.log} disabled />
                </div>

                <p className="flex items-center gap-4">
                    {/*    <span>*/}
                    {/*        완성된 SQL:{' '}*/}
                    {/*        <code className="rounded text-12 py-0.5 px-1 bg-pink-100 text-red-700">*/}
                    {/*            '{fo.value ? '%' : ''}*/}
                    {/*            {value.value}*/}
                    {/*            {bo.value ? '%' : ''}'*/}
                    {/*        </code>*/}
                    {/*    </span>*/}
                </p>
            </div>

            <div className="flex items-center mb-4">
                <TextInput
                    required={true}
                    defaultValue={value.value}
                    onChange={(e) => value.onChange(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <div className="">
                    <p className="">완성된 식</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-full rounded-btn text-sm min-h-[3rem] px-4 pb-1 bg-pink-100 text-red-700 flex items-center flex-wrap">
                        /{value.value}/
                    </div>
                </div>
            </div>
        </div>
    );
});
ConditionRegexpInputGroup.displayName = 'ConditionRegexpInputGroup';
