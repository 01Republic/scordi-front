import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {X, Sparkles} from 'lucide-react';
import excelIcon from '^images/icon/excelIcon.png';
import Image from 'next/image';

interface UploadBillingHistoryExcelModalConfirmProps {
    isOpened: boolean;
    onClose: () => void;
    onClick: () => void;
}

export const UploadBillingHistoryExcelModalConfirm = (props: UploadBillingHistoryExcelModalConfirmProps) => {
    const {isOpened, onClose, onClick} = props;
    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <section className="modal-box relative max-w-xl flex flex-col justify-between gap-10 py-10 px-5">
                <X
                    onClick={onClose}
                    className="absolute top-5 right-5 size-8 text-gray-300 hover:text-gray-200 cursor-pointer"
                />
                <div className="flex flex-col justify-start gap-1">
                    <div className="text-14 text-scordi font-medium">과거 결제내역 가져오기</div>
                    <div className="flex items-center gap-2">
                        <Image src={excelIcon} alt="excelIcon" width={32} height={32} priority />
                        <h3>엑셀로 구독을 한 번에 불러와요.</h3>
                    </div>
                </div>

                <p className="text-gray-600 text-16 whitespace-pre-wrap">
                    카드사 홈페이지에서 과거 결제내역을내려 받기 한 후, <br />
                    스코디에 엑셀 파일을 업로드 해주세요. <br />
                    카드사 정책으로 인해 불러오지 못한 구독도 모두 확인할 수 있어요.
                </p>

                <button type="button" onClick={onClick} className="btn btn-scordi btn-block gap-1">
                    <Sparkles />
                    <span>엑셀로 구독 불러오기</span>
                </button>
            </section>
        </AnimatedModal>
    );
};
