import React from 'react';

interface ModalBtnProps {
    onClick: () => void;
    text?: string;
    isLoading?: boolean;
}

export const ModalButton = (props: ModalBtnProps) => {
    const {onClick, text, isLoading} = props;

    return (
        <button onClick={() => onClick()} disabled={isLoading} className="btn-modal w-full">
            {text ? text : '다음'}
        </button>
    );
};
