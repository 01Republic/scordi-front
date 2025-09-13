import {ButtonHTMLAttributes} from 'react';
import {cn} from '^public/lib/utils';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    pill?: boolean;
    ghost?: boolean;
    square?: boolean;
}

export function Button(props: Props) {
    const {
        type,
        className = '',
        onClick,
        pill = false,
        ghost = false,
        square = false,
        disabled = false,
        ...res
    } = props;

    return (
        <button
            {...res}
            type={type || `button`}
            className={cn(
                `select-none !outline-none cursor-pointer btn-animation inline-flex items-center`, // btn
                `min-h-[28px] h-[28px] px-[8px] text-14 whitespace-nowrap transition-all duration-[20ms] ${
                    disabled ? 'opacity-50 pointer-events-none' : ''
                }`,
                square ? 'w-[28px]' : '',
                'bg-gray-150 hover:bg-gray-300 rounded-[6px]', // theme: default
                ghost ? 'text-gray-500 bg-transparent hover:bg-gray-200/70' : '', // theme: ghost
                pill ? 'rounded-[100px]' : '', // theme: pill
                className,
            )}
            onClick={onClick}
        />
    );
}
