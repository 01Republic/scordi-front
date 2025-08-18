import {WithChildren} from '^types/global.type';
import cn from 'classnames';
import {useTranslation} from 'next-i18next';
import {FormEventHandler, memo} from 'react';

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
    const {t} = useTranslation('common');

    return (
        <form onSubmit={onSubmit}>
            <div className="flex items-start justify-between">
                <h2 className="leading-none text-xl font-semibold ">{title}</h2>
                <div className="absolute right-0 top-0 px-8 py-8 flex items-center gap-4">
                    <a className="link text-14" onClick={() => setIsEditMode(!isEditMode)}>
                        {isEditMode ? t('button.cancel') : isButtonText ? t('button.add') : t('button.edit')}
                    </a>

                    {isEditMode && (
                        <button className={cn('btn btn-sm btn-scordi', {loading: isSaving})}>{t('button.save')}</button>
                    )}
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
