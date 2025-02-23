import React from 'react';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {EmptyText} from '../../common/EmptyText';

export const GmailHeaderItem = (
    props: {
        label: ReactNodeElement;
        value?: ReactNodeElement;
        className?: string;
    } & WithChildren,
) => {
    const {label, value, className = '', children} = props;

    return (
        <section className={`sticky top-0 bg-white grid grid-cols-12 ${className}`}>
            <div className="col-span-4 py-1 font-semibold">{label}</div>
            <div className="col-span-8 py-1 text-right">{children || value || <EmptyText />}</div>
        </section>
    );
};
