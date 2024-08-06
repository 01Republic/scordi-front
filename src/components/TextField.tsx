import {forwardRef, InputHTMLAttributes} from 'react';
import {useId} from 'react-id-generator';
import {Label} from './Label';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelClassname?: string;
    helper?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    ({className = '', label, labelClassname = '', helper, ...props}, ref) => {
        const [id] = useId(1, 'textfield');

        return (
            <div className="label-col">
                {label && <Label htmlFor={id} text={label} className={labelClassname} />}
                <input
                    ref={ref}
                    id={id}
                    className={`textfield ${helper ? 'border-error' : ''} ${className}`}
                    {...props}
                />
                {helper && <p className="text-error text-sm">{helper}</p>}
            </div>
        );
    },
);
