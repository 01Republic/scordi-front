import React from 'react';
import {DefaultButtonProps} from './types';

export const CircleButton = (props: DefaultButtonProps) => {
    const {className = '', color = 'default', outline = false, active = false, disabled = false} = props;
    const classNames = [`btn btn-${color} btn-circle rounded-fill`];
    if (outline) classNames.push('btn-outline');
    if (active) classNames.push('btn-active');
    if (disabled) classNames.push('btn-disabled');
    if (className) classNames.push(className);

    return (
        <button
            type={`${props.type ? props.type : 'button'}`}
            className={classNames.join(' ')}
            onClick={props.onClick}
            style={props.style}
        >
            {props.text || props.children}
        </button>
    );
};
