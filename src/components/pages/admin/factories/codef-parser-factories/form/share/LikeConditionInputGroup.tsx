import React, {memo} from 'react';
import {CheckBoxInput} from '^admin/factories/codef-parser-factories/form/SearchProductPanel/CheckBoxInput';
import {TextInput} from '^components/TextInput';

interface InputProps<T> {
    value: T;
    onChange: (value: T) => any;
}

interface LikeConditionInputGroupProps {
    fo: InputProps<boolean>;
    bo: InputProps<boolean>;
    text: InputProps<string>;
}

export const LikeConditionInputGroup = memo((props: LikeConditionInputGroupProps) => {
    const {fo, bo, text} = props;

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex gap-4">
                    <CheckBoxInput label="전방탐색 (가급적x)" onChange={fo.onChange} />
                    <CheckBoxInput label="후방탐색 (가급적o)" onChange={bo.onChange} />
                </div>

                <p className="flex items-center gap-4">
                    <span>
                        완성된 SQL:{' '}
                        <code className="rounded text-12 py-0.5 px-1 bg-pink-100 text-red-700">
                            '{fo.value ? '%' : ''}
                            {text.value}
                            {bo.value ? '%' : ''}'
                        </code>
                    </span>
                </p>
            </div>
            <TextInput required={true} onChange={(e) => text.onChange(e.target.value)} />
        </>
    );
});
LikeConditionInputGroup.displayName = 'LikeConditionInputGroup';
