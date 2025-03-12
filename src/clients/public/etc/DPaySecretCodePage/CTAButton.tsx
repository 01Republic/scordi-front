import React, {memo} from 'react';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import cn from 'classnames';

interface CTAButtonProps extends WithChildren {
    text?: ReactNodeElement;
    onClick?: () => any;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit';
}

export const CTAButton = memo((props: CTAButtonProps) => {
    const {text, onClick, className = '', disabled = false, type = 'button', children} = props;

    return (
        <button
            type={type}
            className={`flex-1 btn btn-md h-[3.4rem] sm:h-[3rem] transition no-animation btn-animation ${
                disabled ? 'btn-gray !text-gray-500 no-click cursor-not-allowed opacity-50' : 'btn-scordi'
            }`}
            onClick={onClick}
        >
            {text || children}
        </button>
    );
});
CTAButton.displayName = 'CTAButton';
