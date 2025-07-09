import React, {memo, ReactNode} from 'react';
import cn from 'classnames';
import {NextImage} from '^components/NextImage';
import {Check, CreditCard} from 'lucide-react';

interface ConnectionSuccessItemSelectProps {
    url?: string;
    mainText: ReactNode;
    subText: ReactNode;
    icon?: ReactNode;
    onClick?: () => void;
    isSelected?: boolean;
    isDisabled?: boolean;
    comment?: ReactNode;
}

export const ConnectedItem = memo((props: ConnectionSuccessItemSelectProps) => {
    const {url, mainText, subText, icon, onClick, isSelected = false, isDisabled = false, comment = ''} = props;

    const isClickable = !!onClick;

    return (
        <li
            onClick={isDisabled ? undefined : onClick}
            className={cn(
                'w-full rounded-btn py-3.5 px-4 flex items-center justify-between transition-all group',
                isDisabled
                    ? 'cursor-not-allowed bg-gray-500/20'
                    : `${isClickable ? 'cursor-pointer hover:shadow-lg' : ''}`,
                isSelected ? 'bg-primaryColor-bg border border-primaryColor-900' : 'bg-white border border-white',
            )}
        >
            <section className={`flex items-center gap-4 ${isDisabled ? 'opacity-40' : ''}`}>
                {url ? (
                    <NextImage src={url} alt="cardProfilImg" width={40} height={40} className="rounded-full" />
                ) : (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full p-2 bg-gray-200 overflow-hidden">
                        {icon}
                    </div>
                )}
                <div className="flex items-center gap-1 text-gray-800 text-sm">
                    <div>{mainText}</div>
                    {subText && <div className="flex items-center">({subText})</div>}
                </div>
            </section>

            <div className="flex items-center gap-4">
                {comment && <span className="text-12 text-gray-500">{comment}</span>}

                {!isDisabled && (
                    <Check
                        strokeWidth={3}
                        className={cn(
                            'text-20',
                            isSelected
                                ? 'text-indigo-500'
                                : `text-transparent ${isClickable ? 'group-hover:text-indigo-200' : ''}`,
                        )}
                    />
                )}
            </div>
        </li>
    );
});
