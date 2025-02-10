import React, {memo} from 'react';
import {ReactNodeElement, WithChildren} from '^types/global.type';

interface OrgSettingsCardSectionProps extends WithChildren {
    title?: ReactNodeElement;
    right?: ReactNodeElement;
}

export const OrgSettingsCardSection = memo((props: OrgSettingsCardSectionProps) => {
    const {title, right, children} = props;

    return (
        <div className={'card border rounded-lg bg-white p-6'}>
            {title && (
                <div className={'flex justify-between items-center mb-4'}>
                    <div className={'font-bold'}>{title}</div>

                    {right}
                </div>
            )}

            {children}
        </div>
    );
});
OrgSettingsCardSection.displayName = 'OrgSettingsCardSection';
