import {memo} from 'react';
import {LaptopMinimal} from 'lucide-react';
import {DriveButton} from './DriveButton';

interface DriveHardDiskProps {
    activeDrivePath: string | undefined;
    onSelect: (path: string) => Promise<any>;
}

export const DriveHardDisk = memo((props: DriveHardDiskProps) => {
    const {activeDrivePath, onSelect} = props;

    return (
        <DriveButton
            isActive={typeof activeDrivePath !== 'undefined' && activeDrivePath === ''}
            Icon={() => <LaptopMinimal className="size-16" />}
            name="하드디스크"
            onClick={() => onSelect('')}
        />
    );
});
DriveHardDisk.displayName = 'DriveHardDisk';
