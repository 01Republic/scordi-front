import React, {memo, ReactNode} from 'react';
import cn from 'classnames';
import {NextImage} from '^components/NextImage';
import {Check, CreditCard} from 'lucide-react';

interface ConnectionSuccessItemSelectProps {
    url?: string;
    mainText: string;
    subText: string;
    icon: ReactNode;
    isSelected?: boolean;
    onClick?: () => void;
}

export const ConnectedItem = memo((props: ConnectionSuccessItemSelectProps) => {
    const {url, mainText, subText, icon, isSelected = false, onClick} = props;
    return (
        <li
            onClick={onClick}
            className={cn(
                'w-full rounded-btn py-3.5 px-4 flex items-center justify-between hover:shadow-lg cursor-pointer transition-all group',
                isSelected ? 'bg-primaryColor-bg border border-primaryColor-900' : 'bg-white border border-white',
            )}
        >
            <section className="flex items-center gap-4">
                {url ? (
                    <NextImage src={url} alt="cardProfilImg" width={40} height={40} className="rounded-full" />
                ) : (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full p-2 bg-gray-200 overflow-hidden">
                        {icon}
                    </div>
                )}
                <div className="flex gap-1 text-gray-800 text-sm">
                    <span>{mainText}</span>
                    {subText.length > 0 && <span>({subText})</span>}
                </div>
            </section>

            <Check
                strokeWidth={3}
                className={cn(
                    'text-20',
                    isSelected ? 'text-indigo-500' : 'text-transparent group-hover:text-indigo-200',
                )}
            />
        </li>
    );
});
