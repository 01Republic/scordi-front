import React from 'react';
import {DefaultButtonProps} from './types';
import Link from 'next/link';
import {FakeLink} from '^components/v2/ui/buttons/FackLink';

export const BasicButton2 = (props: DefaultButtonProps) => {
    const {
        href,
        target,
        onClick,
        className = '',
        color = 'default',
        outline = false,
        active = false,
        disabled = false,
        size,
    } = props;
    const classNames = [`btn btn-${color}`];
    if (outline) classNames.push('btn-outline');
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
