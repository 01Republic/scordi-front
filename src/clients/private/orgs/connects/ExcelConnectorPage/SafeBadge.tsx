import {BottomUpModalSwal} from '^components/util/modals/share';
import {Shield} from 'lucide-react';

export const SafeBadge = () => {
    const onClick = () => {
        BottomUpModalSwal.fire({
            title: <h4 className="text-lg py-4">고객 데이터를 안전하게 지키기 위한 노력</h4>,
            html: (
                <div className="text-left px-5">
                    <p className="text-16 mb-3">
                        <b>하나. Google Authorized</b>
                        <small className="block">
                            수개월에 걸친 구글 본사의 까다로운 보안 심사를 통과했어요! (2023.11)
                        </small>
                    </p>
                    <p className="text-16 mb-3">
                        <b>둘. 데이터 통신 암호화</b>
                        <small className="block">
                            모든 통신 과정에서 TLS/SSL를 이용하여 고객의 모든 데이터를 안전하게 보호해요.
                        </small>
                    </p>
                    <p className="text-16 mb-3">
                        <b>셋. 비밀 유지 서약</b>
                        <small className="block">
                            고객사의 정보를 누설하지 않도록, 전 직원 비밀 유지 서약을 진행하고 있어요.
                        </small>
                    </p>
                    <p className="text-16 mb-3">
                        <b>넷. ISO 27001 (예정)</b>
                        <small className="block">국제 정보보안 인증제도 심사를 진행하고 있어요!</small>
                    </p>
                </div>
            ),
            backdrop: true,
            position: 'bottom',
            confirmButtonText: '닫기',
            customClass: {
                container: '!p-0 bg-transparent animate__animated animate__faster',
                popup: '!p-0 !rounded-b-none !rounded-t-box shadow-lg',
                title: '!rounded-t-box bg-scordi !py-0 !px-5 !text-left !text-white !text-lg',
                htmlContainer: '!m-0 !pt-4',
                actions: '!m-0 !p-5',
                confirmButton: 'btn btn-block btn-lg !text-xl !rounded-btn !m-0',
            },
            showClass: {backdrop: 'animate__slideInUp'},
            hideClass: {backdrop: 'animate__slideOutDown'},
        });
    };

    return (
        <button
            className="btn btn-sm !bg-green-200 hover:border-green-700 text-green-700 gap-2 !cursor-pointer"
            onClick={onClick}
        >
            <Shield /> 보안 인증 완료
        </button>
    );
};
