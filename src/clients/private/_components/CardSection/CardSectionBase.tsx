import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface CardSectionProps extends WithChildren {}

export const CardSectionBase = memo((props: CardSectionProps) => {
    const {children} = props;

    return <section className="card card-bordered bg-white rounded-md relative p-8">{children}</section>;
});
