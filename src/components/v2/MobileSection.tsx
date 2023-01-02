import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

type MobileSectionProps = {
    'data-component'?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export const MobileSection = memo((props: MobileSectionProps) => {
    return (
        <section
            {...props}
            data-component={props['data-component'] ?? 'MobileSection'}
            className={`MobileSection bs-container ${props.className || ''}`}
        >
            {props.children}
        </section>
    );
});
