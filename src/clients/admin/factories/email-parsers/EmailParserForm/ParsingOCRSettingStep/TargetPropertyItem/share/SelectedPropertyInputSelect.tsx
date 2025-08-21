import {UseFormReturn} from 'react-hook-form';
import {BasePropertyFormData, SelectedProperty} from '^models/EmailParser/types';
import {FetchedAttachmentFile, GmailItemDto} from '^models/InvoiceAccount/type';
import {CopyPromptButton} from './CopyPromtButton';

interface Props<T extends BasePropertyFormData = BasePropertyFormData> {
    form: UseFormReturn<T>;
    email?: GmailItemDto;
    content?: string;
    attachments?: FetchedAttachmentFile[];
    question?: string;
    selectorEngine?: 'xpath' | 'css';
}

export const SelectedPropertySelectSection = <T extends BasePropertyFormData>(props: Props<T>) => {
    const {form, email, content, attachments = [], question, selectorEngine} = props;

    // @ts-ignore
    const register = form.register('selectedProperty');

    return (
        <div className="flex items-center gap-2 mb-1.5">
            <div>이메일의</div>
            <select className="select select-bordered select-sm" {...register}>
                <option value={SelectedProperty.title}>제목</option>
                <option value={SelectedProperty.snippet}>스니펫</option>
                <option value={SelectedProperty.content}>본문</option>
                {attachments.map((f, i) => {
                    const n = i + 1;
                    const key = `selectedProperty.attachment_${n}`;
                    // @ts-ignore
                    const val = SelectedProperty[`attachment_${n}`];
                    return (
                        <option key={key} value={val} disabled={f.data === undefined}>
                            {n}번째 첨부파일
                        </option>
                    );
                })}
            </select>
            <div>중 에서,</div>

            {email && content && question && (
                <div className="ml-auto">
                    <CopyPromptButton
                        form={form}
                        email={email}
                        content={content}
                        attachments={attachments}
                        question={question}
                        engine={selectorEngine}
                    />
                </div>
            )}
        </div>
    );
};
