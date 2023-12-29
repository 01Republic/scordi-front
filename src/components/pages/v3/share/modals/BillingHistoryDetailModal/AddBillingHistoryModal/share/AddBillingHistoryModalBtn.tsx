import React from 'react';

interface AddBillingHistoryModalBtnProps {
    onClick: () => void;
    text?: string;
}

export const AddBillingHistoryModalBtn = (props: AddBillingHistoryModalBtnProps) => {
    const {onClick, text} = props;

    return (
        <button onClick={() => onClick()} className="btn-modal w-full">
            {text ? text : '다음'}
        </button>
    );
};
