import React, {memo} from 'react';

interface StepButtonProps {
    text: string;
    onClick?: () => void;
}

export const StepButton = memo((props: StepButtonProps) => {
    const {text, onClick} = props;
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full flex items-center justify-center rounded-lg bg-primaryColor-900"
        >
            <p className="font-semibold text-16 text-white py-3">{text}</p>
        </button>
    );
});
