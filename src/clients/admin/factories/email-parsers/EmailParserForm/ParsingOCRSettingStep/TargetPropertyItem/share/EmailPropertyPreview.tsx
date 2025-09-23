import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface EmailPropertyPreviewProps extends WithChildren {
    // title: string;
}

export const EmailPropertyPreview = memo((props: EmailPropertyPreviewProps) => {
    const {children} = props;

    return (
        <div className="text-14">
            <div className="mb-2">
                <div className="text-12 text-gray-400">추출 결과</div>
            </div>

            <pre className="p-2 bg-gray-100 border rounded-md border-gray-200 whitespace-pre-wrap break-all">
                {children}
            </pre>
        </div>
    );
});
