import {memo} from 'react';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {X} from 'lucide-react';
import {NextImage} from '^components/NextImage';
import windowsLogo from 'src/images/icon/os/windows.png';
import macLogo from 'src/images/icon/os/mac.png';

interface CertificateSetupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate?: () => void;
}

export const CertificateSetupModal = memo((props: CertificateSetupModalProps) => {
    const {isOpen, onClose, onCreate} = props;
    return (
        <BasicModal open={isOpen} onClose={onClose}>
            <div className="modal-box screen-sm flex flex-col p-8 relative gap-5">
                <section className="flex items-center justify-between">
                    <span className="text-20 font-bold text-neutralColor-900">공동인증서로 연동</span>
                    <X onClick={onClose} className="size-6 text-neutralColor-700 hover:text-gray-200 cursor-pointer" />
                </section>
                <section className="flex flex-col gap-5">
                    <span className="text-neutralColor-800 text-16 font-normal">공동인증서 설치 파일</span>
                    <div className="flex justify-between gap-4 text-neutralColor-700 font-semibold">
                        <button className="w-full flex flex-col gap-3 items-center justify-center border border-neutralColor-500 py-5 rounded-lg hover:text-neutralColor-900 hover:bg-primaryColor-bg hover:border-primaryColor-900">
                            <NextImage src={macLogo} alt="운영체제-윈도우" width={54} height={54} />
                            <span>Mac OS</span>
                        </button>
                        <button className="w-full flex flex-col gap-1 items-center justify-center border border-neutralColor-500 py-5 rounded-lg hover:text-neutralColor-900 hover:bg-primaryColor-bg hover:border-primaryColor-900">
                            <NextImage src={windowsLogo} alt="운영체제-윈도우" width={64} height={64} />
                            <span>Window OS</span>
                        </button>
                    </div>
                </section>
            </div>
        </BasicModal>
    );
});
