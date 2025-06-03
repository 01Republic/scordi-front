import {memo, useEffect, useState} from 'react';
import {Usb} from 'lucide-react';
import {codefCertificate} from '^lib/codef/certificate/main';
import {MoreDropdown} from '^_components/MoreDropdown';
import {DriveButton} from './DriveButton';
import {toast} from 'react-hot-toast';

interface DriveExternalDiskProps {
    activeDrivePath: string | undefined;
    onSelect: (path: string) => Promise<any>;
}

export const DriveExternalDisk = memo((props: DriveExternalDiskProps) => {
    const {activeDrivePath, onSelect} = props;
    const [externalDrivePaths, setExternalDrivePaths] = useState<string[]>([]);

    useEffect(() => {
        codefCertificate
            .fn_OnLoadExtraDrive()
            .then((paths) => paths.filter((path) => path.startsWith('/Volumes/')))
            .then(setExternalDrivePaths);
    }, []);

    if (externalDrivePaths.length === 0) {
        return (
            <DriveButton
                Icon={() => <Usb className="size-14" />}
                name="이동식디스크"
                className="opacity-20"
                onClick={() => {
                    codefCertificate
                        .fn_OnLoadExtraDrive()
                        .then((paths) => paths.filter((path) => path.startsWith('/Volumes/')))
                        .then((paths) => {
                            if (paths.length === 0) toast('이동식디스크가 연결되어있지 않아요.');
                            return paths;
                        })
                        .then(setExternalDrivePaths);
                }}
            />
        );
    }

    return (
        <MoreDropdown
            Trigger={() => (
                <DriveButton
                    isActive={typeof activeDrivePath !== 'undefined' && activeDrivePath !== ''}
                    Icon={() => <Usb className="size-14" />}
                    name="이동식디스크"
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
