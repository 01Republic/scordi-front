import React, {memo} from 'react';
import {X} from 'lucide-react';
import {WithChildren} from '^types/global.type';

interface SelectedResourceProps extends WithChildren {
    name: string;
    onDismiss?: () => any;
}

export const SelectedResource = memo((props: SelectedResourceProps) => {
    const {name, onDismiss, children} = props;

    return (
        <div className="flex items-center gap-2 text-12 text-gray-500">
            <span>선택된 {name}: </span>
            <div className="flex items-center gap-2 cursor-default">
                {children}
                {onDismiss && (
                    <X
                        className="cursor-pointer text-gray-400 hover:text-gray-600 transition-all"
                        onClick={onDismiss}
                    />
                )}
            </div>
        </div>
    );
});
SelectedResource.displayName = 'SelectedResource';
