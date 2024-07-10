import {WithChildren} from '^types/global.type';
import React, {memo} from 'react';

interface FormControlProps extends WithChildren {
    label: string;
    required?: boolean;
}

// 카드 상세 페이지의 우측 정보 패널에서만 사용되는 폼컨트롤
export const FormControl = memo((props: FormControlProps) => {
    const {label: labelText, required = false, children} = props;

    return (
        <label className="grid grid-cols-4 gap-4">
            <div className="col-span-1 flex items-center justify-start">
                <p className="text-14 flex items-center gap-2">
                    <span className="text-gray-400 keep-all">{labelText}</span>
                    {required && <span className="text-red-500">*</span>}
                </p>
            </div>

            <div className="col-span-3">{children}</div>
        </label>
    );
});
FormControl.displayName = 'FormControl';
