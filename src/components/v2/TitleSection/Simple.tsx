import React, {memo, ReactElement} from 'react';
import {WithChildren} from '^types/global.type';
import {MobileSection} from '^components/v2/MobileSection';

type TitleSectionSimpleProps = {
    title?: string | ReactElement | undefined;
    className?: string | undefined;
} & WithChildren;

export const TitleSectionSimple = memo((props: TitleSectionSimpleProps) => {
    const {title, className = '', children} = props;

    return (
        <MobileSection data-component="TitleSectionSimple" className={`py-3 mb-3 ${className}`}>
            <div className="flex w-full justify-between items-center">
                {typeof title === 'string' ? <p>{title}</p> : title}
                {children}
            </div>
        </MobileSection>
    );
});
