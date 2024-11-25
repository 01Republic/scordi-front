import {DefaultButtonProps} from '^components/v2/ui/buttons/types';
import React from 'react';
import {FaTrash} from '@react-icons/all-files/fa/FaTrash';

export const DeleteButton = (props: Omit<DefaultButtonProps, 'color' | 'outline'>) => {
    const {href, target, onClick, className = '', active = false, disabled = false, size} = props;
    const classNames = ['flex', 'h-full', 'items-center', 'flex-1', 'min-w-[32px]', 'justify-center'];
    if (active) classNames.push('btn-active');
    if (disabled) classNames.push('btn-disabled');
    if (size) classNames.push(`btn-${size}`);
    if (className) classNames.push(className);

    return (
        <button
            type={`${props.type ? props.type : 'button'}`}
            className={classNames.join(' ')}
            onClick={onClick}
            style={props.style}
        >
            <FaTrash />
            {props.text && <span className="ml-1">{props.text}</span>}
        </button>
    );
};
