import {FC, InputHTMLAttributes} from 'react';
import {Label} from './Label';
import {useId} from 'react-id-generator';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    wrapperClassName?: string;
}

export const Radio: FC<RadioProps> = ({wrapperClassName = '', className = '', label, children, ...props}) => {
    const [id] = useId(1, 'radio');

    return (
        <div className={`label-row ${wrapperClassName}`}>
            <input id={id} type="radio" className={`radio ${className}`} {...props} />
            {label && <Label htmlFor={id} text={label} />}
            {children && <Label htmlFor={id}>{children}</Label>}
        </div>
    );
};
