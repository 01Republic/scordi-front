import React from 'react';
import {WithChildren} from '^types/global.type';

export type Colors =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'ghost';
export type Size = 'sm' | 'md' | 'big' | 'lg' | 'xl';

export type DefaultButtonProps = {
    text?: string;
    href?: string;
    target?: React.HTMLAttributeAnchorTarget | undefined;
    onClick?: () => void;
    type?: 'button' | 'submit';
    color?: Colors;
    size?: Size;
    outline?: boolean;
    active?: boolean;
    disabled?: boolean;
    className?: string | undefined;
    style?: React.CSSProperties | undefined;
} & WithChildren;
