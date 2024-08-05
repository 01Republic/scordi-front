import {FC, LabelHTMLAttributes} from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    text?: string;
}

export const Label: FC<LabelProps> = ({children, className = '', text, ...props}) => {
    return (
        <label className={`label ${className}`} {...props}>
            {text ?? children}
        </label>
    );
};
