import React, {memo} from 'react';

interface BottomUpModalHeaderProps {
    title: string;
    subtitle?: string;
}

export const BottomUpModalHeader = memo((props: BottomUpModalHeaderProps) => {
    const {title, subtitle} = props;

    return (
        <div className="w-full flex flex-col py-4">
            <p className="font-semibold text-lg">{title}</p>
            {subtitle && <p className="text-sm opacity-80">{subtitle}</p>}
        </div>
    );
});
