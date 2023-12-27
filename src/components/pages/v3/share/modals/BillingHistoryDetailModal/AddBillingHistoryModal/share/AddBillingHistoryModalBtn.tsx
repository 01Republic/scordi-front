import React from 'react';

interface AddBillingHistoryModalBtnProps {
    onClick: () => void;
    text?: string;
}

export const AddBillingHistoryModalBtn = (props: AddBillingHistoryModalBtnProps) => {
    const {onClick, text} = props;

    return (
        <div className={`fixed left-0 bottom-0 w-full flex justify-evenly gap-3 px-5 py-5`}>
            <button onClick={() => onClick()} className="btn-modal w-full">
                {text ? text : '다음'}
            </button>
        </div>
    );
};
