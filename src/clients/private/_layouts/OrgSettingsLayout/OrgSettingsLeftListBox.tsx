import React, {memo} from 'react';
import {ReactNodeElement, WithChildren} from '^types/global.type';

interface OrgSettingsLeftListBoxProps extends WithChildren {
    title?: ReactNodeElement;
}

export const OrgSettingsLeftListBox = memo((props: OrgSettingsLeftListBoxProps) => {
    const {title, children} = props;

    return (
        <div className={'flex flex-col gap-1 text-14'}>
            {title && <div className={'text-12 text-gray-400 font-semibold px-4 py-3'}>{title}</div>}

            {children}
        </div>
    );
});
OrgSettingsLeftListBox.displayName = 'OrgSettingsLeftListBox';
