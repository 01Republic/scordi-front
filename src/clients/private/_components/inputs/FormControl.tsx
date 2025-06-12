import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface FormControlProps extends WithChildren {
    label: string;
    required?: boolean;
    className?: string;
}

export const FormControl = memo((props: FormControlProps) => {
    const {label: labelText, required = false, className = '', children} = props;

    return (
        <label className="grid grid-cols-4 gap-4">
            <div className={`col-span-1 flex items-center justify-start ${className}`}>
                <p className="text-16 flex items-center gap-2">
                    <span>{labelText}</span>
                    {required && <span className="text-red-500">*</span>}
                </p>
            </div>

            <div className="col-span-3">{children}</div>
        </label>
    );
});
FormControl.displayName = 'FormControl';
