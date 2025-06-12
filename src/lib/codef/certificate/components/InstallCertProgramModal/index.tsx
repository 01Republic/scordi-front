import {memo, useState} from 'react';
import {RotateCw, X} from 'lucide-react';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {NextImage} from '^components/NextImage';
import windowsLogo from 'src/images/icon/os/windows.png';
import macLogo from 'src/images/icon/os/mac.png';
import {codefCertificate, InstallCheckErrorCode, JsonpError} from '^lib/codef/certificate';
import {delay} from '^components/util/delay';
import {minuteAfter, secondAfter} from '^utils/dateTime';
import {getOS} from '^utils/os';

interface InstallCertProgramModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInstall: () => void;
}

export const InstallCertProgramModal = memo((props: InstallCertProgramModalProps) => {
    const {isOpen, onClose, onInstall} = props;
    const os = getOS();

    const checkInstall = (limitedTime: Date) => {
        if (!isOpen) return;
        codefCertificate
            .initialize()
            .then(() => onInstall())
            .catch(async (error: JsonpError) => {
                const now = new Date();

                if (limitedTime.getTime() <= now.getTime()) {
                    console.log('failed');
                    return console.log(error.name, error.message, error.errorCode);
                }

                switch (error.errorCode) {
                    case InstallCheckErrorCode.NotInstalled: // 설치가 안되어 있는 사용자
                    case InstallCheckErrorCode.VersionOver: // 구버전 모듈이 설치 되어있는 사용자
                        // 1초 후 다시체크
                        await delay(1000);
                        return checkInstall(limitedTime);
                    default:
                        return console.log(error.name, error.message, error.errorCode);
                }
            });
    };

    return (
        <BasicModal open={isOpen} onClose={onClose}>
            <div className="modal-box screen-sm flex flex-col p-8 relative gap-5">
                <section className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-20 font-bold text-gray-900">공동인증서 프로그램 설치</span>
                        <X onClick={onClose} className="size-6 text-gray-700 hover:text-gray-200 cursor-pointer" />
                    </div>

                    <div className="text-16 text-gray-800">안전한 연결을 위해 프로그램 설치가 필요해요</div>
                </section>

                <section>
                    <div className="mb-4 flex justify-center text-gray-700 font-semibold">
                        {os === 'MacOS' ? (
                            <a
                                href="/codef/installers/codefCertMac.dmg"
                                download
                                className="flex gap-4 items-center justify-center p-4 border border-gray-300 rounded-lg transition-all duration-500 hover:text-gray-900 hover:bg-primaryColor-bg hover:border-primaryColor-900"
                                onClick={() => checkInstall(minuteAfter(5))}
                            >
                                <NextImage src={macLogo} alt="운영체제-윈도우" width={32} height={32} />
                                <span>Download for MacOS</span>
                            </a>
                        ) : os === 'Windows' ? (
                            <a
                                href="/codef/installers/codefCertInstaller.exe"
                                download
                                className="flex gap-4 items-center justify-center p-4 border border-gray-300 rounded-lg transition-all duration-500 hover:text-gray-900 hover:bg-primaryColor-bg hover:border-primaryColor-900"
                                onClick={() => checkInstall(minuteAfter(5))}
                            >
                                <NextImage src={windowsLogo} alt="운영체제-윈도우" width={36} height={36} />
                                <span>Download for Windows</span>
                            </a>
                        ) : os === 'Linux' ? (
                            <div className="flex gap-4 items-center justify-center p-4 border border-gray-300 rounded-lg text-red-500">
                                Linux 프로그램은 지원되지 않아요.
                            </div>
                        ) : (
                            <div className="w-full flex-1">
                                {/*<div className="text-red-500 mb-4">*/}
                                {/*    운영체제를 확인할 수 없어요.*/}
                                {/*    <br />*/}
                                {/*    알맞은 선택파일을 설치해주세요.*/}
                                {/*</div>*/}

                                <div className="flex justify-between gap-4 text-gray-700 font-semibold">
                                    <a
                                        href="/codef/installers/codefCertMac.dmg"
                                        download
                                        className="w-full flex flex-col gap-3 items-center justify-center border border-gray-500 py-5 rounded-lg hover:text-gray-900 hover:bg-primaryColor-bg hover:border-primaryColor-900"
                                        onClick={() => checkInstall(minuteAfter(5))}
                                    >
                                        <NextImage src={macLogo} alt="운영체제-윈도우" width={54} height={54} />
                                        <span>Mac OS</span>
                                    </a>
                                    <a
                                        href="/codef/installers/codefCertInstaller.exe"
                                        download
                                        className="w-full flex flex-col gap-1 items-center justify-center border border-gray-500 py-5 rounded-lg hover:text-gray-900 hover:bg-primaryColor-bg hover:border-primaryColor-900"
                                        onClick={() => checkInstall(minuteAfter(5))}
                                    >
                                        <NextImage src={windowsLogo} alt="운영체제-윈도우" width={64} height={64} />
                                        <span>Window OS</span>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-center">
                        <ReloadButton onClick={() => checkInstall(secondAfter(10))} timeoutSec={10} />
                    </div>
                </section>
            </div>
        </BasicModal>
    );
});

interface Props {
    onClick: () => void;
    timeoutSec: number;
}

const ReloadButton = memo((props: Props) => {
    const {onClick, timeoutSec} = props;
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div
            className={`${
                isLoading ? 'pointer-events-none opacity-40' : 'hover:text-gray-900 hover:border-gray-900'
            } cursor-pointer text-gray-500 transition-all border-b border-transparent flex items-center gap-2 btn-animation`}
            onClick={() => {
                if (isLoading) return;
                setIsLoading(true);
                onClick();
                setTimeout(() => setIsLoading(false), 1000 * timeoutSec);
            }}
        >
            <span>Reload</span>
            <RotateCw fontSize={13} className={isLoading ? 'animate-spin' : ''} />
        </div>
    );
});
