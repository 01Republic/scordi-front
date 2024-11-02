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
            className={cn(
                'w-full h-16 sm:h-10 text-18 sm:text-14 rounded-md text-white transition btn-animation',
                className,
                {
                    'bg-gray-300 hover:bg-gray-400 focus:outline-gray-400 no-click cursor-not-allowed': disabled,
                    'bg-[#6454FF] hover:bg-[#3F51B5] focus:outline-blue-600': !disabled,
                },
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {text || children}
        </button>
    );
});
CTAButton.displayName = 'CTAButton';
