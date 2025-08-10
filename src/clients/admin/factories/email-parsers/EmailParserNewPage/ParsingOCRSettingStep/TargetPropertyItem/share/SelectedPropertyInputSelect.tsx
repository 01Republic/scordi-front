import {SelectedProperty} from '../../EmailParserFormData';
import {forwardRef} from 'react';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const SelectedPropertyInputSelect = forwardRef<HTMLSelectElement, Props>((props, ref) => {
    return (
        <select {...props} ref={ref} className="select select-bordered select-sm">
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
    );
});
