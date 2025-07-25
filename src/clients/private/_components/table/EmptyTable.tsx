import {memo, ReactNode} from 'react';
import {Inbox} from 'lucide-react';
import {ReactComponentLike} from 'prop-types';
import {cn} from '^public/lib/utils';

interface EmptyTableProps {
    className?: string;
    Icon?: () => JSX.Element;
    message?: ReactNode;
    buttonText?: string;
    buttonAction?: () => void;
    Buttons?: ReactComponentLike;
}

export const EmptyTable = memo((props: EmptyTableProps) => {
    const {
        className = '',
        Icon = DefaultEmptyIcon,
        message = '조회된 결과가 없어요.',
        buttonText,
        buttonAction,
        Buttons,
    } = props;

    return (
        <div className={cn('flex flex-col items-center justify-center py-16', className)}>
            <p className={'text-2xl text-slate-200 mb-4'}>{Icon && <Icon />}</p>
            <p className="text-16 font-semibold text-gray-400 mb-1.5 whitespace-pre-line">{message}</p>

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
