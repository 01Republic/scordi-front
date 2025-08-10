import {useEffect} from 'react';
import {TargetPropertyItemContentProps, TargetPropertyItemProps, useTargetPropertyItem} from '../hooks';
import {TargetPropertyItemContainer} from '../share/TargetPropertyItemContainer';
import {SelectedProperty} from '../../EmailParserFormData';

export function TargetPropertyTextItem(props: TargetPropertyItemProps) {
    const {defaultValue, onChange, title, emailItem, content, optional = false} = props;

    return (
        <TargetPropertyItemContainer title={title} optional={optional}>
            {({isExists, isFinished}) => (
                <TargetPropertyTextItemContent
                    emailItem={emailItem}
                    content={content}
                    defaultValue={defaultValue}
                    isExists={isExists}
                    isFinished={isFinished}
                    onChange={onChange}
                />
            )}
        </TargetPropertyItemContainer>
    );
}

export const TargetPropertyTextItemContent = (props: TargetPropertyItemContentProps) => {
    const {emailItem, content, defaultValue, onChange, isExists = false, isFinished = false} = props;
    const {form, resultValue, regexResult} = useTargetPropertyItem({
        defaultValue,
        emailItem,
        content,
    });

    useEffect(() => {
        console.log('isFinished', isFinished, form.getValues());
        if (isFinished) onChange && onChange(form.getValues());
    }, [isFinished]);

    if (!isExists) return <></>;
    if (isFinished) return <div className="text-12 text-scordi font-semibold">{resultValue}</div>;

    return (
        <div className="space-y-2">
            <div className="text-14">
                <div className="mb-2">
                    <div className="text-12 text-gray-400">추출 방법</div>
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
                </div>

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
            </div>

            <div className="text-14">
                <div className="mb-2">
                    <div className="text-12 text-gray-400">추출 결과</div>
                </div>

                <pre className="p-2 bg-gray-100 border rounded-md border-gray-200 whitespace-pre-wrap">
                    {resultValue}
                </pre>
            </div>
        </div>
    );
};
