import {memo, ReactNode} from 'react';
import {Inbox} from 'lucide-react';
import {ReactComponentLike} from 'prop-types';
import {cn} from '^public/lib/utils';
import {useTranslation} from 'next-i18next';

interface EmptyTableProps {
    className?: string;
    Icon?: () => JSX.Element;
    message?: ReactNode;
    buttonText?: string;
    buttonAction?: () => void;
    Buttons?: ReactComponentLike;
}

export const EmptyTable = memo((props: EmptyTableProps) => {
    const {className = '', Icon = DefaultEmptyIcon, message, buttonText, buttonAction, Buttons} = props;
    const {t} = useTranslation('common');

    const defaultMessage = t('table.emptyMessage');

    return (
        <div className={cn('flex flex-col items-center justify-center py-16', className)}>
            <p className={'text-2xl text-slate-200 mb-4'}>{Icon && <Icon />}</p>
            <p className="text-16 font-semibold text-gray-400 mb-1.5 whitespace-pre-line">
                {message || defaultMessage}
            </p>

            {Buttons && (
                <div className={'py-4'}>
                    <Buttons />
                </div>
            )}

            {buttonText && buttonAction && (
                <button className={'btn btn-scordi mt-4 !text-16'} onClick={buttonAction}>
                    {buttonText}
                </button>
            )}
        </div>
    );
});

const DefaultEmptyIcon = () => (
    <span className="relative">
        <Inbox className="text-slate-200" fontSize={48} />
    </span>
);
