import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {WithChildren} from '^types/global.type';
import {BasePropertyFormData, SelectedPatternMethod} from '^models/EmailParser/types';

interface Props<T extends BasePropertyFormData = BasePropertyFormData> extends WithChildren {
    form: UseFormReturn<T>;
}

export const PatternSection = <T extends BasePropertyFormData>(props: Props<T>) => {
    const {form, children} = props;

    // @ts-ignore
    const methodRegister = form.register('pattern.method');

    return (
        <div className="flex items-center gap-2">
            <div>다음</div>
            <select className="select select-bordered select-sm" {...methodRegister}>
                <option value={SelectedPatternMethod.REGEX}>패턴(정규식)</option>
                <option value={SelectedPatternMethod.XPATH}>경로(XPath)</option>
                <option value={SelectedPatternMethod.CODE} disabled>
                    코드
                </option>
            </select>
            <div>에 매칭되는</div>

            {children}
        </div>
    );
};

export const PatternRegexValue = <T extends BasePropertyFormData>(props: Props<T>) => {
    const {form, children} = props;

    // @ts-ignore
    const valueRegister = form.register('pattern.value');

    // @ts-ignore
    const captureIndexRegister = form.register('pattern.captureIndex', {min: 0});

    return (
        <>
            <input className="input input-bordered input-sm flex-1" {...valueRegister} />

            <div />
            <div />

            <input
                type="number"
                className="input input-bordered input-sm"
                defaultValue={0}
                min={0}
                {...captureIndexRegister}
            />
            <div>번째 값</div>
            {children}
        </>
    );
};

export const PatternXPathValue = <T extends BasePropertyFormData>(props: Props<T>) => {
    const {form, children} = props;

    // @ts-ignore
    const valueRegister = form.register('pattern.value');

    return (
        <>
            <input className="input input-bordered input-sm flex-1" {...valueRegister} />

            <div>값</div>
            {children}
        </>
    );
};
