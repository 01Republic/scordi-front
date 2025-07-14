import React from 'react';
import {DefaultButtonProps} from '^components/v2/ui/buttons/types';
import {Icon} from '^components/Icon';
import {useRouter} from 'next/router';

export const BackButton = (props: Omit<DefaultButtonProps, 'color' | 'outline'>) => {
    const router = useRouter();
    const {href, onClick, className = '', active = false, disabled = false, size = 'sm'} = props;
    const classNames = ['flex', 'h-full', 'items-center'];
    if (active) classNames.push('btn-active');
    if (disabled) classNames.push('btn-disabled');
    if (size) classNames.push(`text-${size}`);
    if (className) classNames.push(className);

    return (
        <button
            type={`${props.type ? props.type : 'button'}`}
            className={classNames.join(' ')}
            onClick={() => {
                href ? router.push(href) : router.back();
            }}
            style={props.style}
        >
            <span className="mr-1">
                <Icon.ChevronLeft className={`text-${size}`} />
            </span>
            <span>{props.text ?? '뒤로'}</span>
        </button>
    );
};
