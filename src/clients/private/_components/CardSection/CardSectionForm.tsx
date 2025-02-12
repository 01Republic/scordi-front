import React, {FormEventHandler, memo} from 'react';
import {WithChildren} from '^types/global.type';
import {CardSectionEditButton} from './CardSectionEditButton';

interface CardSectionFormProps extends WithChildren {
    title: string;
    isEditMode: boolean;
    setIsEditMode: (isEditMode: boolean) => void;
    onSubmit?: FormEventHandler<HTMLFormElement>;
}

export const CardSectionForm = memo((props: CardSectionFormProps) => {
    const {title, isEditMode, setIsEditMode, onSubmit, children} = props;

    return (
        <form onSubmit={onSubmit}>
            <div className="flex items-start justify-between pb-8">
                <h2 className="leading-none text-xl font-semibold ">{title}</h2>
                <CardSectionEditButton isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
            </div>
            <div className="max-w-md flex flex-col gap-4">{children}</div>
        </form>
    );
});
