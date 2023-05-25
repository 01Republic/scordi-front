import React, {memo, ReactNode} from 'react';
import {WithChildren} from '^types/global.type';

interface SettingsBodyPanelProps extends WithChildren {
    title?: string;
    buttons?: ReactNode | ReactNode[];
}

export const SettingBodyPanel = memo((props: SettingsBodyPanelProps) => {
    const {title, buttons, children} = props;

    return (
        <div className="card w-full bg-base-100 shadow-lg">
            <div className="card-body">
                <div className="flex items-start">
                    {title && (
                        <h2 className="card-title !font-bold pt-2 mb-6">
                            {title}
                            {/*<div className="badge badge-secondary">NEW</div>*/}
                        </h2>
                    )}

                    {buttons && <div className="ml-auto mb-6">{buttons}</div>}
                </div>
                {children}
            </div>
        </div>
    );
});
