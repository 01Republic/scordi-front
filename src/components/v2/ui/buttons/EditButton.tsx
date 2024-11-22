import React, {Fragment} from 'react';
import Link from 'next/link';
import {Icon} from '^components/Icon';
import {IoPencil} from '@react-icons/all-files/io5/IoPencil';
import {FaPen} from '@react-icons/all-files/fa/FaPen';
import {FakeLink} from '^components/v2/ui/buttons/FackLink';
import {DefaultButtonProps} from '^components/v2/ui/buttons/types';

export const EditButton = (props: Omit<DefaultButtonProps, 'color' | 'outline'>) => {
    const {href, target, onClick, className = '', active = false, disabled = false, size} = props;
    const classNames = ['flex', 'h-full', 'items-center', 'flex-1', 'min-w-[32px]', 'justify-center'];
    if (active) classNames.push('btn-active');
    if (disabled) classNames.push('btn-disabled');
    if (size) classNames.push(`btn-${size}`);
    if (className) classNames.push(className);

    const LinkTo = href ? Link : FakeLink;

    return (
        <LinkTo href={href!} target={target}>
            <button
                type={`${props.type ? props.type : 'button'}`}
                className={classNames.join(' ')}
                onClick={onClick}
                style={props.style}
            >
                <FaPen />
                {props.text && <span className="ml-1">{props.text}</span>}
            </button>
        </LinkTo>
    );
};
