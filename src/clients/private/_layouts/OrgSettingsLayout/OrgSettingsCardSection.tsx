import React, {memo} from 'react';
import {ReactNodeElement, WithChildren} from '^types/global.type';

interface OrgSettingsCardSectionProps extends WithChildren {
    className?: string;
    title?: ReactNodeElement;
    titleNoMargin?: boolean;
    right?: ReactNodeElement;
}

export const OrgSettingsCardSection = memo((props: OrgSettingsCardSectionProps) => {
    const {className = '', title, titleNoMargin = false, right, children} = props;

    return (
        <div className={`card border rounded-lg bg-white p-6 ${className}`}>
            {title && (
                <div className={`flex justify-between items-center ${titleNoMargin ? '' : 'mb-4'}`}>
                    <div className={'font-bold'}>{title}</div>

                    {right}
                </div>
            )}

            {children}
        </div>
    );
});
OrgSettingsCardSection.displayName = 'OrgSettingsCardSection';
