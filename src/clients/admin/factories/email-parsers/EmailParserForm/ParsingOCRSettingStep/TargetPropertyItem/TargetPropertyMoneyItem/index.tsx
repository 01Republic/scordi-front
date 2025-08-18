import React, {useEffect} from 'react';
import {plainToInstance} from 'class-transformer';
import {MoneyPropertyFormData, SelectedPatternMethod} from '^models/EmailParser/types';
import {TargetPropertyItemContentProps, TargetPropertyItemProps, useTargetPropertyItem} from '../hooks';
import {
    TargetPropertyItemContainer,
    EmailPropertyPreview,
    SelectedPropertySelectSection,
    PatternSection,
    PatternRegexValue,
    PatternXPathValue,
} from '../share';
import {CurrencyParser} from './CurrencyParser';

export function TargetPropertyMoneyItem(props: TargetPropertyItemProps<MoneyPropertyFormData>) {
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
                <TargetPropertyMoneyItemContent
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

const TargetPropertyMoneyItemContent = (props: TargetPropertyItemContentProps<MoneyPropertyFormData>) => {
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
    const {form, resultValue, regexResult} = useTargetPropertyItem<MoneyPropertyFormData>({
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
        const propertyFormData = plainToInstance(MoneyPropertyFormData, form.getValues());
        if (!emailItem || !content || !propertyFormData) {
            return <div className="text-12 text-scordi font-semibold break-all">{resultValue}</div>;
        }
        const value = propertyFormData.parse(emailItem, content).resultValue;
        return <div className="text-12 text-scordi font-semibold break-all">{value}</div>;
    }

    const patternMethod = (form.watch('pattern.method') as SelectedPatternMethod) || SelectedPatternMethod.REGEX;

    return (
        <div className={`space-y-2`}>
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

            <CurrencyParser
                regexResult={Array.isArray(regexResult) ? regexResult[0] : regexResult}
                defaultValue={form.getValues('currencyParser')}
                onChange={(currencyParserData) => {
                    const currencyParserValue = form.getValues('currencyParser');
                    form.setValue('currencyParser', currencyParserData);
                }}
            />
        </div>
    );
};
