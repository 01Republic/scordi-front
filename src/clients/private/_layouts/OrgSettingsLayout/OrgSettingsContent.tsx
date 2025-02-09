import React, {memo} from 'react';
import {ReactNodeElement, WithChildren} from '^types/global.type';

interface OrgSettingsContentProps extends WithChildren {
    title: ReactNodeElement;
}

export const OrgSettingsContent = memo((props: OrgSettingsContentProps) => {
    const {title, children} = props;

    return (
        <>
            <div className={'text-xl font-bold mb-4'}>{title}</div>

            <div className="flex flex-col gap-6 mb-8">{children}</div>
        </>
    );
});
OrgSettingsContent.displayName = 'OrgSettingsContent';
