import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ScopeButtonProps extends WithChildren {
    text?: string;
    onClick?: () => any;
    className?: string;
    active?: boolean;
}

export const ScopeButton = memo((props: ScopeButtonProps) => {
    const {text, onClick, className = '', active = false, children} = props;

    return (
        <button
            className={`btn btn-sm rounded-full transition-all ${
                active
                    ? '!bg-scordi-50 !border-scordi-300 !text-scordi'
                    : 'border-gray-300 bg-white hover:bg-scordi-50 hover:border-scordi-300'
            } ${className}`}
            onClick={onClick}
        >
            {children || text}
        </button>
    );
});
ScopeButton.displayName = 'ScopeButton';
