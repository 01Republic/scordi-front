import React from 'react';
import Link from 'next/link';
import {FakeLink} from '^components/v2/ui/buttons/FackLink';
import {DefaultButtonProps} from './types';

export const BasicButton = (props: Omit<DefaultButtonProps, 'color' | 'outline'>) => {
    const {href, target, onClick, className = '', active = false, disabled = false, size} = props;
    const classNames = [];
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
                {props.text || props.children}
            </button>
        </LinkTo>
    );
};
