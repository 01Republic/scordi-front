import React, {useEffect} from 'react';
import {NumberPropertyFormData, SelectedPatternMethod} from '^models/EmailParser/types';
import {TargetPropertyItemContentProps, TargetPropertyItemProps, useTargetPropertyItem} from '../hooks';
import {
    EmailPropertyPreview,
    PatternRegexValue,
    PatternSection,
    PatternXPathValue,
    SelectedPropertySelectSection,
    TargetPropertyItemContainer,
} from '../share';

export function TargetPropertyNumberItem(props: TargetPropertyItemProps<NumberPropertyFormData>) {
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
                <TargetPropertyNumberItemContent
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

export const TargetPropertyNumberItemContent = (props: TargetPropertyItemContentProps<NumberPropertyFormData>) => {
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

    // 완료 체크되면 본체 폼에 값 반영
    useEffect(() => {
        if (isFinished) onChange && onChange(form.getValues());
    }, [isFinished]);

    // 없어요로 바뀌면 본체 폼에 값을 비움 (작성되어있는 인풋값은 유지)
    useEffect(() => {
        if (!isFinished && !isExists && defaultValue) onChange && onChange(undefined);
    }, [isFinished, isExists]);

    if (!isExists) return <></>;
    if (isFinished) return <div className="text-12 text-scordi font-semibold break-all">{resultValue}</div>;

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
                    {patternMethod === SelectedPatternMethod.XPATH && (
                        <PatternXPathValue form={form}>
                            <div />
                            <div />
                        </PatternXPathValue>
                    )}
                    {patternMethod === SelectedPatternMethod.CODE && <PatternRegexValue form={form} />}
                </PatternSection>
            </div>

            <EmailPropertyPreview>{resultValue}</EmailPropertyPreview>
        </div>
    );
};
