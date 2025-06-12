import {memo, useEffect, useState} from 'react';
import {X} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {confirm3} from '^components/util/dialog/confirm3';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {codefCertificate} from '../../main';
import {CertFileDto} from '../../cert-file.dto';
import {DriveHardDisk} from './DriveHardDisk';
import {DriveExternalDisk} from './DriveExternalDisk';
import {CertificateList} from './CertificateList';
import {KeepBodyStickyStyle} from '^components/util/dialog/KeepBodyStickyStyle';

interface CertificateSignModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate?: (selectedCert: CertFileDto, password: string, pfxInfo: string) => any;
}

export const CertificateSignModal = memo((props: CertificateSignModalProps) => {
    const {isOpen = false, onClose, onCreate} = props;
    const form = useForm<{password: string}>({
        mode: 'onChange',
        defaultValues: {password: ''},
    });
    const [deviceInfo, setDeviceInfo] = useState<any>();
    const [activeDrivePath, setActiveDrivePath] = useState<string>();
    const [certList, setCertList] = useState<CertFileDto[]>([]);
    const [selectedCert, setSelectedCert] = useState<CertFileDto>();

    useEffect(() => {
        isOpen ? load('') : close();
    }, [isOpen]);

    const close = () => {
        form.reset();
        codefCertificate
            .close()
            .then(() => {
                setDeviceInfo(undefined);
                setActiveDrivePath(undefined);
                setSelectedCert(undefined);
                setCertList([]);
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

    const errorAlert = (count: number) => {
        confirm3(
            '인증서 비밀번호 오류',
            <div className="text-16 text-gray-800 font-normal">
                인증서 비밀번호 {count}회 오류.
                <br />
                {count === 5
                    ? '5회 이상 오류로 인해 프로그램이 종료 됩니다.'
                    : '5회 이상 오류 시 프로그램이 종료 됩니다.'}
                <KeepBodyStickyStyle />
            </div>,
            undefined,
            {showCancelButton: false},
        ).then(() => {
            count === 5 ? onClose() : null;
        });
    };

    const onSubmit = ({password}: {password: string}) => {
        if (!selectedCert) return;
        if (!password) return;

        // TODO: ing...
        codefCertificate
            .fn_ConvertPFX(selectedCert, password)
            .then((pfxInfo) => {
                onCreate && onCreate(selectedCert, password, pfxInfo);
            })
            .catch((err) => {
                if (String(err.code) === '-9997') {
                    errorAlert(err.count);
                    return;
                }
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
                            className="btn btn-secondary btn-block btn-gray no-animation btn-animation"
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
