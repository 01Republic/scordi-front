import {memo, useState} from 'react';
import {Usb} from 'lucide-react';
import {codefCertificate} from '^lib/codef/certificate/main';
import {MoreDropdown} from '^_components/MoreDropdown';
import {DriveButton} from './DriveButton';

interface DriveExternalDiskProps {
    activeDrivePath: string | undefined;
    onSelect: (path: string) => Promise<any>;
}

export const DriveExternalDisk = memo((props: DriveExternalDiskProps) => {
    const {activeDrivePath, onSelect} = props;
    const [externalDrivePaths, setExternalDrivePaths] = useState<string[]>([]);

    return (
        <MoreDropdown
            Trigger={() => (
                <DriveButton
                    isActive={typeof activeDrivePath !== 'undefined' && activeDrivePath !== ''}
                    Icon={() => <Usb className="size-14" />}
                    name="이동식디스크"
                    onClick={() => codefCertificate.fn_OnLoadExtraDrive().then(setExternalDrivePaths)}
                />
            )}
        >
            {({hide}) => {
                return (
                    <div className="flex flex-col bg-white border rounded-md shadow-lg">
                        {externalDrivePaths.map((path) => (
                            <div
                                key={path}
                                className={`cursor-pointer px-2 py-2.5 text-12 ${
                                    activeDrivePath === path ? 'bg-scordi-50' : 'hover:bg-scordi-50'
                                }`}
                                onClick={() => onSelect(path).then(hide)}
                            >
                                {path}
                            </div>
                        ))}
                    </div>
                );
            }}
        </MoreDropdown>
    );
});
DriveExternalDisk.displayName = 'DriveExternalDisk';
