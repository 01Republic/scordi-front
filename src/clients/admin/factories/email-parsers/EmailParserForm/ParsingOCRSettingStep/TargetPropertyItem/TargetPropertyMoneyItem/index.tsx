import React, {useEffect} from 'react';
import {MoneyPropertyFormData, SelectedProperty} from '^models/EmailParser/types';
import {TargetPropertyItemContentProps, TargetPropertyItemProps, useTargetPropertyItem} from '../hooks';
import {TargetPropertyItemContainer} from '../share/TargetPropertyItemContainer';
import {CopyPromptButton} from '../share/CopyPromtButton';
import {CurrencyParser} from './CurrencyParser';

interface TargetPropertyMoneyItemProps extends TargetPropertyItemProps<MoneyPropertyFormData> {
    //
}

export function TargetPropertyMoneyItem(props: TargetPropertyMoneyItemProps) {
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
    const {form, selectedProperty, resultValue, regexResult} = useTargetPropertyItem<MoneyPropertyFormData>({
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
        // const currencyParserData = form.getValues('currencyParser');
        // const currencyCodeMappers = form.getValues('currencyParser.currencyCodeMappers') || [];
        return (
            <div className="text-12 text-scordi font-semibold break-all">
                {/*<div>*/}
                {/*    <div>화폐:</div>*/}
                {/*    <div>{currencyParserData.isDynamicCurrency ? currencyParserData}</div>*/}
                {/*</div>*/}
                <div>
                    {/*<div>금액:</div>*/}
                    <div>{resultValue}</div>
                </div>
            </div>
        );
    }

    const isHTMLParsingMode = selectedProperty === SelectedProperty.content;

    return (
        <div className={`space-y-2`}>
            <div className="text-14">
                <div className="mb-2">
                    <div className="text-12 text-gray-400" onClick={() => console.log(form.getValues())}>
                        추출 방법
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-1.5">
                    <div>이메일의</div>
                    <select className="select select-bordered select-sm" {...form.register('selectedProperty')}>
                        <option value={SelectedProperty.title}>제목</option>
                        <option value={SelectedProperty.snippet}>스니펫</option>
                        <option value={SelectedProperty.content}>본문</option>
                        <option value={SelectedProperty.attachment_1} disabled>
                            첫 번째 첨부파일
                        </option>
                        <option value={SelectedProperty.attachment_2} disabled>
                            두 번째 첨부파일
                        </option>
                    </select>
                    <div>중 에서,</div>

                    {isHTMLParsingMode && content && question && (
                        <div className="ml-auto">
                            <CopyPromptButton content={content} question={question} engine={selectorEngine} />
                        </div>
                    )}
                </div>

                {isHTMLParsingMode ? (
                    <div className="flex items-center gap-2">
                        <div>다음 경로(XPath)와 일치하는</div>
                        <input className="input input-bordered input-sm flex-1" {...form.register('pattern.value')} />

                        <div>값</div>

                        <div />
                        <div />
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <div>다음 패턴(정규식)과 일치하는</div>
                        <input className="input input-bordered input-sm flex-1" {...form.register('pattern.value')} />

                        <div />
                        <div />

                        <input
                            type="number"
                            className="input input-bordered input-sm"
                            defaultValue={0}
                            min={0}
                            {...form.register('pattern.captureIndex', {min: 0})}
                        />
                        <div>번째 값</div>
                    </div>
                )}
            </div>

            <div className="text-14">
                <div className="mb-2">
                    <div className="text-12 text-gray-400">추출 결과</div>
                </div>

                <pre className="p-2 bg-gray-100 border rounded-md border-gray-200 whitespace-pre-wrap">
                    {resultValue}
                </pre>
            </div>

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
