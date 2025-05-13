import {memo, useEffect, useState} from 'react';
import {X, LaptopMinimal, Usb} from 'lucide-react';
import {codefCertificate} from '^lib/codef/certificate/main';
import {CertFileDto} from '^lib/codef/certificate/cert-file.dto';
import {Table} from '^v3/share/table/Table';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {yyyy_mm_dd} from '^utils/dateTime';

interface CertificateLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate?: () => void;
}

export const CertificateLinkModal = memo((props: CertificateLinkModalProps) => {
    const {isOpen, onClose, onCreate} = props;
    const [certList, setCertList] = useState<CertFileDto[]>([]);

    useEffect(() => {
        if (isOpen) showDialog();
    }, [isOpen]);

    function showDialog() {
        // $('#cert-copy-modal').modal('show'); // 인증서 다이얼로그 활성화
        //
        // $('#tab-export').click();
        // certExportInit(); // 인증서 내보내기 초기화
        //
        // selectDevice(); // 저장매체 선택
        // // fn_OnLoadExtraDrive();
        //
        // fn_OnLoadCertification('');
        codefCertificate.fn_OnLoadCertification('').then(setCertList);
    }
    console.log('certList', certList);

    // [인증서 내보내기] 초기화
    function certExportInit() {
        initCertPassword(); // 탭 활성화 초기화

        // $('.tab-content .tab-pane').removeClass('active');
        // $('.nav .nav-link').removeClass('active'); // 첫번째탭 활성화
        //
        // $('.tab-content .tab-pane').eq(0).addClass('active');
        // $('.nav .nav-link').eq(0).addClass('active');
        // $('#cert').show();
        // $('#cert-export-select').show();
        // $('#cert-save-path').hide();
    }

    // [인증서 내보내기] 패스워드 입력 레이아웃 초기화
    function initCertPassword() {
        // $('#tab-export').removeClass('disabled');
        // $('.btn-group-toggle .btn').removeClass('disabled');
        // $('.table').addClass('table-hover').removeClass('table-secondary');
        // $('#input-cert-password').show();
        // $('#input-cert-number').hide();
    }

    return (
        <BasicModal open={isOpen} onClose={onClose}>
            <div className="modal-box screen-sm flex flex-col p-8 relative gap-5">
                <section className="flex items-center justify-between">
                    <span className="text-20 font-bold text-gray-900">공동인증서로 연동</span>
                    <X onClick={onClose} className="size-6 text-gray-700 hover:text-gray-200 cursor-pointer" />
                </section>
                <section className="flex flex-col gap-5">
                    <span className="text-gray-800 text-16 font-normal">저장매체</span>
                    <div className="flex justify-between gap-4 text-gray-700 font-semibold">
                        <button className="w-full flex flex-col gap-2 items-center justify-center border border-gray-500 py-5 rounded-lg hover:text-gray-900 hover:bg-primaryColor-bg hover:border-primaryColor-900">
                            <LaptopMinimal className="size-16" />
                            <span>하드 디스크</span>
                        </button>
                        <button className="w-full flex flex-col gap-2 items-center justify-center border border-gray-500 py-5 rounded-lg hover:text-gray-900 hover:bg-primaryColor-bg hover:border-primaryColor-900">
                            <Usb className="size-14" />
                            <span>이동식 디스크</span>
                        </button>
                    </div>
                </section>
                <section className="flex flex-col gap-3">
                    <span className="text-gray-800 text-16 font-normal">인증서 선택</span>
                    <span className="text-gray-700 text-14 font-normal">
                        (인증서 위치: C:\Users\사용자\AppData\LocalLow\NPKI)
                    </span>
                    <div className="card bg-white border rounded-md">
                        <Table>
                            <thead className="[--rounded-box:0.375rem]">
                                <tr className="bg-slate-100">
                                    <th></th>
                                    <th>구분</th>
                                    <th>사용자</th>
                                    <th>만료일</th>
                                    <th>발급기관</th>
                                </tr>
                            </thead>
                            <tbody className="[--rounded-box:0.375rem]">
                                {certList.map((cert, i) => (
                                    <tr key={i} className="group cursor-pointer">
                                        <td className="group-hover:bg-primaryColor-bg flex justify-center items-center pr-0">
                                            <input type="radio" className="w-5 h-5 m-1" />
                                        </td>
                                        <td className="group-hover:bg-primaryColor-bg">{cert.useType}</td>
                                        <td className="group-hover:bg-primaryColor-bg">{cert.userName}</td>
                                        <td className="group-hover:bg-primaryColor-bg">
                                            {yyyy_mm_dd(cert.expireDate)}
                                        </td>
                                        <td className="group-hover:bg-primaryColor-bg">{cert.organization}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </section>
                <section className="flex flex-col gap-2">
                    <span className="text-gray-800 text-16 font-normal">인증서 비밀번호</span>
                    <input
                        type="text"
                        placeholder="비밀번호를 입력해주세요."
                        className="p-4 border border-gray-500 rounded-lg text-14 placeholder-gray-600 placeholder-text-14"
                    />
                </section>
            </div>
        </BasicModal>
    );
});
