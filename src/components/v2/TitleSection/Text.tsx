import React, {memo, ReactElement} from 'react';
import {WithChildren} from '^types/global.type';

type TitleSectionTextProps = {
    text?: string | ReactElement | undefined;
    size?: 'sm' | 'lg' | 'xl' | '2xl' | '3xl';
    className?: string | undefined;
} & WithChildren;

export const TitleSectionText = memo((props: TitleSectionTextProps) => {
    const {text, size = '3xl', className = '', children} = props;
    return <h1 className={`text-${size} ${className}`}>{text || children}</h1>;
});
