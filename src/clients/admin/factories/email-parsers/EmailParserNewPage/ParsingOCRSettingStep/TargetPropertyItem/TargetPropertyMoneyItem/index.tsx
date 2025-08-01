import {memo} from 'react';
import {SelectedProperty, TargetPropertyItemProps, useTargetProperty} from '../hooks';
import {TargetPropertyItemContainer} from '../share/TargetPropertyItemContainer';
import {CurrencyParser} from './CurrencyParser';

interface TargetPropertyMoneyItemProps extends TargetPropertyItemProps {
    //
}

export const TargetPropertyMoneyItem = memo((props: TargetPropertyMoneyItemProps) => {
    const {title, emailItem, content, optional = false} = props;
    const {
        selectedProperty,
        setSelectedProperty,
        inputValue,
        setInputValue,
        captureIndex,
        setCaptureIndex,
        regexResult,
        resultValue,
    } = useTargetProperty({emailItem, content});

    return (
        <TargetPropertyItemContainer title={title} emailItem={emailItem} content={content} optional={optional}>
            {({isExists}) => (
                <div className="space-y-2">
                    <div className="text-14">
                        <div className="mb-2">
                            <div className="text-12 text-gray-400">추출 방법</div>
                        </div>

                        <div className="flex items-center gap-2 mb-1.5">
                            <div>이메일의</div>
                            <select
                                className="select select-bordered select-sm"
                                defaultValue={selectedProperty}
                                onChange={(e) => setSelectedProperty(e.target.value as SelectedProperty)}
                            >
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
                        </div>

                        <div className="flex items-center gap-2">
                            <div>패턴(정규식)</div>
                            <input
                                type="text"
                                className="input input-bordered input-sm flex-1"
                                defaultValue={inputValue}
                                onChange={(e) => setInputValue(`${e.target.value || ''}`.trim())}
                            />
                            <div>과 일치하는</div>

                            <div />
                            <div />

                            <input
                                type="number"
                                min={0}
                                className="input input-bordered input-sm"
                                defaultValue={captureIndex}
                                onChange={(e) => setCaptureIndex(Number(e.target.value))}
                            />
                            <div>번째 값</div>
                        </div>
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
                        emailItem={emailItem}
                        content={content}
                        regexResult={Array.isArray(regexResult) ? regexResult[0] : regexResult}
                    />
                </div>
            )}
        </TargetPropertyItemContainer>
    );
});
