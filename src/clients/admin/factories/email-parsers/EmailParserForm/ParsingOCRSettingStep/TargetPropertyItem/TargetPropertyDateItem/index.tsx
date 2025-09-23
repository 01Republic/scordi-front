import React, {useEffect} from 'react';
import {parse} from 'date-fns';
import {DatePropertyFormData, SelectedPatternMethod} from '^models/EmailParser/types';
import {TargetPropertyItemContentProps, TargetPropertyItemProps, useTargetPropertyItem} from '../hooks';
import {
    EmailPropertyPreview,
    PatternRegexValue,
    PatternSection,
    PatternXPathValue,
    SelectedPropertySelectSection,
    TargetPropertyItemContainer,
} from '../share';

export function TargetPropertyDateItem(props: TargetPropertyItemProps<DatePropertyFormData>) {
    const {
        defaultValue,
        onChange,
        title,
        emailItem,
        content,
        attachments = [],
        optional = false,
        question,
        selectorEngine = 'xpath',
    } = props;

    return (
        <TargetPropertyItemContainer title={title} optional={optional} isFinished={!!defaultValue}>
            {({isExists, isFinished}) => (
                <TargetPropertyDateItemContent
                    emailItem={emailItem}
                    content={content}
                    attachments={attachments}
                    defaultValue={defaultValue}
                    isExists={isExists}
                    isFinished={isFinished}
                    onChange={onChange}
                    question={question || `${title}`}
                    selectorEngine={selectorEngine}
                />
            )}
        </TargetPropertyItemContainer>
    );
}

const TargetPropertyDateItemContent = (props: TargetPropertyItemContentProps<DatePropertyFormData>) => {
    const {
        emailItem,
        content,
        attachments = [],
        defaultValue,
        onChange,
        isExists = false,
        isFinished = false,
        question,
        selectorEngine = 'xpath',
    } = props;
    const {form, resultValue} = useTargetPropertyItem({
        defaultValue,
        emailItem,
        content,
        attachments,
    });

    const dateFormat = form.watch('dateParser.format') || '';
    const dateString = (() => {
        if (!dateFormat) return resultValue;
        const parsed = parse(resultValue, dateFormat, new Date());
        return isNaN(parsed.valueOf()) ? resultValue : parsed.toLocaleString();
    })();

    // 완료 체크되면 본체 폼에 값 반영
    useEffect(() => {
        if (isFinished) onChange && onChange(form.getValues());
    }, [isFinished]);

    // 없어요로 바뀌면 본체 폼에 값을 비움 (작성되어있는 인풋값은 유지)
    useEffect(() => {
        if (!isFinished && !isExists && defaultValue) onChange && onChange(undefined);
    }, [isFinished, isExists]);

    if (!isExists) return <></>;
    if (isFinished) return <div className="text-12 text-scordi font-semibold break-all">{dateString}</div>;

    const patternMethod = (form.watch('pattern.method') as SelectedPatternMethod) || SelectedPatternMethod.REGEX;

    return (
        <div className="space-y-2">
            <div className="text-14">
                <div className="mb-2">
                    <div className="text-12 text-gray-400">추출 방법</div>
                </div>

                <SelectedPropertySelectSection
                    form={form}
                    email={emailItem}
                    content={content}
                    attachments={attachments}
                    question={question}
                    selectorEngine={selectorEngine}
                />

                <PatternSection form={form}>
                    {patternMethod === SelectedPatternMethod.REGEX && <PatternRegexValue form={form} />}
                    {patternMethod === SelectedPatternMethod.XPATH && <PatternXPathValue form={form} />}
                    {patternMethod === SelectedPatternMethod.CODE && <PatternRegexValue form={form} />}
                    <div>에서, </div>
                </PatternSection>

                <div className="flex items-center gap-2">
                    <div>날짜 형식</div>
                    <input
                        type="text"
                        className="input input-bordered input-sm"
                        {...form.register('dateParser.format')}
                    />
                    <div>으로 매칭</div>
                </div>
            </div>

            <EmailPropertyPreview>{dateString}</EmailPropertyPreview>
        </div>
    );
};
