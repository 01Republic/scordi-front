import {memo, useState} from 'react';
import {parse} from 'date-fns';
import {SelectedProperty, TargetPropertyItemProps, useTargetProperty} from '../hooks';
import {TargetPropertyItemContainer} from '../share/TargetPropertyItemContainer';

interface TargetPropertyDateItemProps extends TargetPropertyItemProps {
    //
}

export const TargetPropertyDateItem = memo((props: TargetPropertyDateItemProps) => {
    const {title, emailItem, content, optional = false} = props;
    const {
        selectedProperty,
        setSelectedProperty,
        inputValue,
        setInputValue,
        captureIndex,
        setCaptureIndex,
        resultValue,
    } = useTargetProperty({emailItem, content});
    const [dateFormat, setDateFormat] = useState('');
    const dateString = (() => {
        if (!dateFormat) return resultValue;
        const parsed = parse(resultValue, dateFormat, new Date());
        return isNaN(parsed.valueOf()) ? resultValue : parsed.toLocaleString();
    })();

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

                        <div className="flex items-center gap-2 mb-1.5">
                            <div>다음 패턴(정규식)과 일치하는</div>
                            <input
                                type="text"
                                className="input input-bordered input-sm flex-1"
                                defaultValue={inputValue}
                                onChange={(e) => setInputValue(`${e.target.value || ''}`.trim())}
                            />

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

                            <div>에서, </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div>날짜 형식</div>
                            <input
                                type="text"
                                className="input input-bordered input-sm"
                                defaultValue={dateFormat}
                                onChange={(e) => setDateFormat(e.target.value)}
                            />
                            <div>으로 매칭</div>
                        </div>
                    </div>

                    <div className="text-14">
                        <div className="mb-2">
                            <div className="text-12 text-gray-400">추출 결과</div>
                        </div>

                        <pre className="p-2 bg-gray-100 border rounded-md border-gray-200 whitespace-pre-wrap">
                            {dateString}
                        </pre>
                    </div>
                </div>
            )}
        </TargetPropertyItemContainer>
    );
});
