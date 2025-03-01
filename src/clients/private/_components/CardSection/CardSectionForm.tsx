import React, {FormEventHandler, memo} from 'react';
import {WithChildren} from '^types/global.type';
import cn from 'classnames';

interface CardSectionFormProps extends WithChildren {
    title: string;
    isEditMode: boolean;
    setIsEditMode: (isEditMode: boolean) => void;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    isButtonText?: boolean;
    isSaving: boolean;
}

export const CardSectionForm = memo((props: CardSectionFormProps) => {
    const {title, isEditMode, setIsEditMode, onSubmit, isButtonText = false, children, isSaving} = props;

    return (
        <form onSubmit={onSubmit}>
            <div className="flex items-start justify-between">
                <h2 className="leading-none text-xl font-semibold ">{title}</h2>
                <div className="absolute right-0 top-0 px-8 py-8 flex items-center gap-4">
                    <a className="link text-14" onClick={() => setIsEditMode(!isEditMode)}>
                        {isEditMode ? '취소' : isButtonText ? '추가' : '수정'}
                    </a>

                    {isEditMode && <button className={cn('btn btn-sm btn-scordi', {loading: isSaving})}>저장</button>}
                </div>
            </div>
            {!isButtonText ? (
                <div className="max-w-lg flex flex-col gap-4 pt-8">{children}</div>
            ) : (
                <div
                    className={`flex flex-col max-w-lg gap-4 overflow-hidden transition-all h-auto ${
                        isEditMode ? 'pt-8' : '!h-0'
                    }`}
                >
                    {children}
                </div>
            )}
        </form>
    );
});
