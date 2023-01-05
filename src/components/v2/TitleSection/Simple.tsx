import React, {memo, ReactElement} from 'react';
import {WithChildren} from '^types/global.type';
import {MobileSection} from '^components/v2/MobileSection';
import {TitleSectionText} from '^components/v2/TitleSection/Text';

type TitleSectionSimpleProps = {
    title?: string | ReactElement | undefined;
    className?: string | undefined;
    flex?: boolean | undefined;
    direction?: 'col' | 'row' | 'col-reverse' | 'row-reverse' | undefined;
} & WithChildren;

export const TitleSectionSimple = memo((props: TitleSectionSimpleProps) => {
    const {title, className = '', flex = true, direction, children} = props;

    return (
        <MobileSection data-component="TitleSectionSimple" className={`py-3 mb-3 ${className}`}>
            <div
                className={`${flex ? 'flex' : ''} ${
                    direction ? `flex-${direction}` : ''
                } w-full justify-between items-center`}
            >
                {typeof title === 'string' ? <TitleSectionText text={title} /> : title}
                {children}
            </div>
        </MobileSection>
    );
});
