import {memo} from 'react';

interface InstalledStatusBadgeProps {
    isInstalled: boolean;
}

export const InstalledStatusBadge = memo((props: InstalledStatusBadgeProps) => {
    const {isInstalled} = props;

    return (
        <div className={`flex items-center gap-[4px] ${isInstalled ? 'text-green-500' : 'text-gray-400'}`}>
            <div
                className={`inline-block relative rounded-full h-[6px] w-[6px] ${
                    isInstalled ? 'bg-green-500' : 'bg-gray-400'
                }`}
            />
            <div className="">{isInstalled ? '설치됨' : '설치되지 않음'}</div>
        </div>
    );
});
InstalledStatusBadge.displayName = 'InstalledStatusBadge';
