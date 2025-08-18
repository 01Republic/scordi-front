import React, {useEffect} from 'react';
import {SelectedPatternMethod} from '^models/EmailParser/types';
import {isLinkString, OutLink} from '^components/OutLink';
import {TargetPropertyItemContentProps, TargetPropertyItemProps, useTargetPropertyItem} from '../hooks';
import {
    EmailPropertyPreview,
    PatternRegexValue,
    PatternSection,
    PatternXPathValue,
    SelectedPropertySelectSection,
    TargetPropertyItemContainer,
} from '../share';

export function TargetPropertyTextItem(props: TargetPropertyItemProps) {
    const {
        defaultValue,
        onChange,
        title,
        emailItem,
        content,
        optional = false,
        question,
        selectorEngine = 'xpath',
    } = props;

    return (
        <TargetPropertyItemContainer title={title} optional={optional} isFinished={!!defaultValue}>
            {({isExists, isFinished}) => (
                <TargetPropertyTextItemContent
                    emailItem={emailItem}
                    content={content}
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

export const TargetPropertyTextItemContent = (props: TargetPropertyItemContentProps) => {
    const {
        emailItem,
        content,
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
    if (isFinished) {
        return (
            <div className="text-12 text-scordi font-semibold break-all">
                {isLinkString(resultValue) ? (
                    <OutLink href={resultValue} className="text-indigo-500/70 hover:text-indigo-700" target="_blank" />
                ) : (
                    resultValue
                )}
            </div>
        );
    }

    const patternMethod = (form.watch('pattern.method') as SelectedPatternMethod) || SelectedPatternMethod.REGEX;

    return (
        <div className="space-y-2">
            <div className="text-14">
                <div className="mb-2">
                    <div className="text-12 text-gray-400">추출 방법</div>
                </div>

                <SelectedPropertySelectSection
                    form={form}
                    content={content}
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
