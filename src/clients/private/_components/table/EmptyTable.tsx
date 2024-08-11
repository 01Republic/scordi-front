import React from 'react';

interface EmptyTableProps {
    icon?: React.ReactNode;
    message: string;
    buttonText?: string;
    buttonAction?: () => void;
}

export const EmptyTable = (props: EmptyTableProps) => {
    const {icon, message, buttonText, buttonAction} = props;
    return (
        <div className={'text-center py-16'}>
            <p className={'text-2xl'}>{icon}</p>
            <p>{message}</p>
            {buttonText && buttonAction && (
                <button className={'mt-4 px-4 py-2 bg-scordi-500 text-white rounded-md'} onClick={buttonAction}>
                    {buttonText}
                </button>
            )}
        </div>
    );
};
