import {memo, useEffect, useState} from 'react';
import {Usb} from 'lucide-react';
import {codefCertificate} from '^lib/codef/certificate/main';
import {MoreDropdown} from '^_components/MoreDropdown';
import {DriveButton} from './DriveButton';
import {toast} from 'react-hot-toast';
import {getOS} from '^utils/os';
import {useQuery} from '@tanstack/react-query';

interface DriveExternalDiskProps {
    activeDrivePath: string | undefined;
    onSelect: (path: string) => Promise<any>;
}

export const DriveExternalDisk = memo((props: DriveExternalDiskProps) => {
    const {activeDrivePath, onSelect} = props;
    const [isHovered, setIsHovered] = useState(false);
    const {data: externalDrivePaths, refetch} = useQuery({
        queryKey: ['DriveExternalDisk', 'loadExtraDrive'],
        queryFn: () => loadExtraDrive(),
        initialData: [],
        placeholderData: (a) => a || [],
    });

    const loadExtraDrive = async () => {
        return codefCertificate.fn_OnLoadExtraDrive().then((paths) => {
            const os = getOS();
            console.log({paths, os});
            if (!os || !['MacOS', 'Windows'].includes(os)) return [];

            return paths.filter((path) => {
                if (!path) return false;

                if (os === 'MacOS') {
                    if (!path.startsWith('/Volumes/')) return false;
                    if (path.includes('/Volumes/codef')) return false;
                }

                if (os === 'Windows') {
                    if (path.startsWith('C:')) return false;
                }

                return true;
            });
        });
    };

    return (
        <div
            className="w-full"
            onMouseEnter={() => {
                if (isHovered) return;
                refetch();
                setIsHovered(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
        >
            {externalDrivePaths.length === 0 ? (
                <DriveButton
                    Icon={() => <Usb className="size-14" />}
                    name="이동식디스크"
                    className="opacity-20"
                    onClick={() => toast('이동식디스크가 연결되어있지 않아요.')}
                />
            ) : (
                <MoreDropdown
                    className="w-full"
                    Trigger={() => (
                        <DriveButton
                            isActive={isHovered || (typeof activeDrivePath !== 'undefined' && activeDrivePath !== '')}
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
            )}
        </div>
    );
});
DriveExternalDisk.displayName = 'DriveExternalDisk';
