import React, {ButtonHTMLAttributes, FC} from 'react';
import {WithChildren} from '^types/global.type';

interface ContentHeadingProps {
    title: string;
}

export const ContentHeading: FC<WithChildren & ContentHeadingProps> = ({title, children}) => {
    return (
        <div className="flex items-center mt-5 mb-10">
            <h1 className="flex-1 font-bold text-3xl">{title}</h1>
            {children}
        </div>
    );
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    text?: string;
    disabled?: boolean;
};

export const ContentHeadingPrimaryButton: FC<WithChildren & ButtonProps> = ({
    text = '',
    className = '',
    disabled,
    children,
    ...props
}) => {
    return (
        <button
            className={`btn btn-primary ${className} ${disabled ? 'btn-disabled' : ''}`}
            {...props}
            {...(disabled
                ? {
                      tabIndex: -1,
                      role: 'button',
                      'aria-disabled': true,
                  }
                : {})}
        >
            {children}
            {text}
        </button>
    );
};

export const ContentHeadingSecondaryButton: FC<WithChildren & ButtonProps> = ({
    text = '',
    className,
    children,
    ...props
}) => {
    return (
        <button className={`btn btn-active bg-white hover:bg-white mr-2 ${className}`} {...props}>
            {children}
            {text}
        </button>
    );
};
