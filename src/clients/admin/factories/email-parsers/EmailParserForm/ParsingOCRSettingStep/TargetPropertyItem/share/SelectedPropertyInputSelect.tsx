import {UseFormReturn} from 'react-hook-form';
import {BasePropertyFormData, SelectedProperty} from '^models/EmailParser/types';
import {CopyPromptButton} from './CopyPromtButton';

interface Props<T extends BasePropertyFormData = BasePropertyFormData> {
    form: UseFormReturn<T>;
    content?: string;
    question?: string;
    selectorEngine?: 'xpath' | 'css';
}

export const SelectedPropertySelectSection = <T extends BasePropertyFormData>(props: Props<T>) => {
    const {form, content, question, selectorEngine} = props;

    // @ts-ignore
    const register = form.register('selectedProperty');
    // @ts-ignore
    const selectedProperty = form.watch('selectedProperty') as SelectedProperty;
    const isHTMLParsingMode = selectedProperty === SelectedProperty.content;

    return (
        <div className="flex items-center gap-2 mb-1.5">
            <div>이메일의</div>
            <select className="select select-bordered select-sm" {...register}>
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
    );
};
