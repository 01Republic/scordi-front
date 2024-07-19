import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface InformationAlertProps extends WithChildren {}

export const InformationAlert = memo((props: InformationAlertProps) => {
    const {children} = props;

    return (
        <div className="border-b border-gray-300">
            <div className="bg-orange-100 text-orange-500 py-2 px-8 text-14 flex items-center justify-between">
                {children}
            </div>
        </div>
    );
});
InformationAlert.displayName = 'InformationAlert';
