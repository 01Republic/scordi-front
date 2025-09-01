import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface FormControlProps extends WithChildren {
    label: string;
    required?: boolean;
    className?: string;
}

export const FormControl = memo((props: FormControlProps) => {
    const {label, className = '', children, required = false} = props;

    return (
        <label className={className}>
            <div className="flex items-center gap-1 mb-1">
                <span className="">{label}</span>
                {required && <span className="text-red-500">*</span>}
            </div>

            <div className="flex items-center min-h-[40px]">{children}</div>
        </label>
    );
});
