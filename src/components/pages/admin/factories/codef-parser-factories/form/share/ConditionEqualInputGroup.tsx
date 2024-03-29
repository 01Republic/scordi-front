import React, {memo} from 'react';
import {TextInput} from '^components/TextInput';

interface ConditionEqualInputGroupProps {
    value: string;
    onChange: (value: string) => any;
}

export const ConditionEqualInputGroup = memo((props: ConditionEqualInputGroupProps) => {
    const {value, onChange} = props;

    return (
        <>
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
        </>
    );
});
ConditionEqualInputGroup.displayName = 'ConditionEqualInputGroup';
