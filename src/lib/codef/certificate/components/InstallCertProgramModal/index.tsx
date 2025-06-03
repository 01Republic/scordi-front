import {memo} from 'react';
import {X} from 'lucide-react';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {NextImage} from '^components/NextImage';
import windowsLogo from 'src/images/icon/os/windows.png';
import macLogo from 'src/images/icon/os/mac.png';
import {codefCertificate, InstallCheckErrorCode, JsonpError} from '^lib/codef/certificate';
import {delay} from '^components/util/delay';
import {minuteAfter} from '^utils/dateTime';

interface InstallCertProgramModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInstall: () => void;
}

export const InstallCertProgramModal = memo((props: InstallCertProgramModalProps) => {
    const {isOpen, onClose, onInstall} = props;

    const checkInstall = (limitedTime: Date) => {
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
                <section className="flex items-center justify-between">
                    <span className="text-20 font-bold text-gray-900">공동인증서 프로그램 설치</span>
                    <X onClick={onClose} className="size-6 text-gray-700 hover:text-gray-200 cursor-pointer" />
                </section>
                <section className="flex flex-col gap-5">
                    <span className="text-gray-800 text-16 font-normal">
                        안전한 연결을 위해 프로그램 설치가 필요해요
                    </span>
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
                </section>
            </div>
        </BasicModal>
    );
});
