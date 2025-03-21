import React from 'react';
import cn from 'classnames';

interface StepButtonProps {
    text: string;
    onClick?: () => void;
    disabled: boolean;
}

export const StepButton = (props: StepButtonProps) => {
    const {text, onClick, disabled} = props;

    return (
        <button
            type="button"
            disabled={!disabled}
            onClick={onClick}
            className={cn(
                'w-full flex items-center justify-center rounded-lg ',
                !disabled ? 'bg-neutral-200 text-neutral-300' : 'bg-primaryColor-900 text-white',
            )}
        >
            <p className="font-semibold text-16 py-3">{text}</p>
        </button>
    );
};
