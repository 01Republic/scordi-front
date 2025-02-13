import React, {FormEventHandler, memo} from 'react';
import {WithChildren} from '^types/global.type';
import {CardSectionEditButton} from './CardSectionEditButton';

interface CardSectionFormProps extends WithChildren {
    title: string;
    isEditMode: boolean;
    setIsEditMode: (isEditMode: boolean) => void;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    isButtonText?: boolean;
}

export const CardSectionForm = memo((props: CardSectionFormProps) => {
    const {title, isEditMode, setIsEditMode, onSubmit, isButtonText = false, children} = props;

    return (
        <form onSubmit={onSubmit}>
            <div className="flex items-start justify-between">
                <h2 className="leading-none text-xl font-semibold ">{title}</h2>
                <CardSectionEditButton
                    isEditMode={isEditMode}
                    setIsEditMode={setIsEditMode}
                    isButtonText={isButtonText}
                />
            </div>
            {!isButtonText ? (
                <div className="max-w-md flex flex-col gap-4 pt-8">{children}</div>
            ) : (
                <div
                    className={`flex flex-col max-w-md gap-4 overflow-hidden transition-all h-auto ${
                        isEditMode ? 'pt-8' : '!h-0'
                    }`}
                >
                    {children}
                </div>
            )}
        </form>
    );
});
