import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface EmailPropertyPreviewProps extends WithChildren {
    title: string;
}

export const EmailPropertyPreview = memo((props: EmailPropertyPreviewProps) => {
    const {title, children} = props;

    return (
        <div className="mb-3">
            <div className="font-semibold mb-2">{title}</div>
            <pre className="p-2 bg-gray-100 border rounded-md border-gray-200 whitespace-pre-wrap">{children}</pre>
        </div>
    );
});
