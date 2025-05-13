import {memo, useEffect, useState} from 'react';
import {X} from 'lucide-react';
import {codefCertificate} from '^lib/codef/certificate/main';
import {CertFileDto} from '^lib/codef/certificate/cert-file.dto';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {DriveHardDisk} from './DriveHardDisk';
import {DriveExternalDisk} from './DriveExternalDisk';
import {CertificateList} from './CertificateList';
import {useForm} from 'react-hook-form';
import {errorToast} from '^api/api';
import {toast} from 'react-hot-toast';

interface CertificateLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate?: () => void;
}

export const CertificateLinkModal = memo((props: CertificateLinkModalProps) => {
    const {isOpen, onClose, onCreate} = props;
    const [deviceInfo, setDeviceInfo] = useState<any>();
    const [activeDrivePath, setActiveDrivePath] = useState<string>();
    const [certList, setCertList] = useState<CertFileDto[]>([]);
    const form = useForm<{password: string}>({
        defaultValues: {password: ''},
    });
    const [selectedCert, setSelectedCert] = useState<CertFileDto>();

    useEffect(() => {
        isOpen ? load('') : close();
    }, [isOpen]);

    const close = () => {
        codefCertificate
            .close()
            .then(() => {
                setDeviceInfo(undefined);
                setActiveDrivePath(undefined);
                setSelectedCert(undefined);
                setCertList([]);
                form.reset();
            })
            .catch(console.log);
    };

    const load = async (path: string) => {
        if (activeDrivePath === path) return;
        return Promise.allSettled([loadDevice(path), loadCertList(path)]);
    };

    const loadDevice = async (path: string) => {
        setActiveDrivePath(path);
        return codefCertificate
            .fetchDeviceInfo(path)
            .then(setDeviceInfo)
            .catch((e) => setDeviceInfo(undefined));
    };

    const loadCertList = async (path: string) => {
        setSelectedCert(undefined);
        form.setValue('password', '');
        return codefCertificate
            .fn_OnLoadCertification(path)
            .then(setCertList)
            .catch(() => setCertList([]));
    };

    const onSubmit = ({password}: {password: string}) => {
        if (!selectedCert) return;
        if (!password) return;

        // TODO: ing...
        codefCertificate
            .fn_ConvertPFX(selectedCert, password)
            .then((pfxInfo) => {
                console.log('pfxInfo :: ' + pfxInfo);
            })
            .catch((err) => {
                toast.error(err.message);
            });
    };

    return (
        <BasicModal open={isOpen} onClose={onClose}>
            <div className="modal-box screen-md flex flex-col p-8 relative gap-5">
                <section className="flex items-center justify-between">
                    <span className="text-18 font-bold text-gray-900">공동인증서로 연동</span>
                    <X
                        onClick={onClose}
                        className="size-6 text-gray-300 hover:text-gray-700 cursor-pointer transition-all"
                    />
                </section>

                <section>
                    <div className="mb-2 flex items-center gap-2">
                        <p className="text-14 font-medium">저장매체</p>
                    </div>

                    <div className="w-full grid grid-cols-2 items-stretch gap-4 text-gray-700 font-semibold">
                        <DriveHardDisk activeDrivePath={activeDrivePath} onSelect={load} />
                        <DriveExternalDisk activeDrivePath={activeDrivePath} onSelect={load} />
                    </div>
                </section>

                <section>
                    <div className="mb-2 flex items-center gap-2">
                        <p className="text-14 font-medium">인증서 선택</p>
                        {selectedCert && <p className="text-12 font-light">(인증서 위치: {selectedCert.location})</p>}
                    </div>

                    <CertificateList certList={certList} selectedCert={selectedCert} onSelect={setSelectedCert} />
                </section>

                <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <section>
                        <div className="mb-2 flex items-center gap-2">
                            <p className="text-14 font-medium">인증서 비밀번호</p>
                        </div>

                        <input
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                            className="input input-bordered w-full disabled:bg-gray-50"
                            {...form.register('password')}
                            required
                            autoComplete="off"
                            spellCheck="false"
                            disabled={!selectedCert}
                        />
                    </section>

                    <section className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className="btn btn-block btn-gray no-animation btn-animation"
                            onClick={onClose}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className={`btn btn-block btn-scordi no-animation btn-animation disabled:bg-primaryColor-900/20 disabled:text-primaryColor-900/50 disabled:border-none`}
                            disabled={!selectedCert || !form.watch('password')}
                        >
                            확인
                        </button>
                    </section>
                </form>
            </div>
        </BasicModal>
    );
});
