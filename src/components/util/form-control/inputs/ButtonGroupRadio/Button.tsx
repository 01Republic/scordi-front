import React, {memo, MouseEventHandler} from 'react';
import {WithChildren} from '^types/global.type';

interface ButtonProps extends WithChildren {
    onClick: MouseEventHandler<HTMLButtonElement>;
    text?: string;
    isActive?: boolean;
    className?: string;
}

export const Button = memo((props: ButtonProps) => {
    const {onClick, isActive = false, className = '', text, children} = props;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`btn text-lg rounded-[0.5rem] border-0 ${
                isActive ? 'bg-gray-300' : 'hover:bg-gray-200'
            } ${className}`}
        >
            {children || text}
        </button>
    );
});
Button.displayName = 'Button';
