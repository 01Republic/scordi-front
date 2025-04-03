import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {X, Sparkles} from 'lucide-react';
import excelIcon from 'src/images/icon/excelIcon.png';
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
                    <a href="#" target="_blank" className="link-primary">
                        과거 결제내역 가져오기
                    </a>
                    <div className="flex items-center gap-2">
                        <Image src={excelIcon} alt="excelIcon" width={32} height={32} priority />
                        <p className="font-semibold text-32">엑셀로 구독을 한 번에 불러와요.</p>
                    </div>
                </div>
                <div className="flex flex-col gap-1 text-gray-600 text-18">
                    <span>카드사 홈페이지에서 과거 결제내역을내려 받기 한 후,</span>
                    <span>스코디에 엑셀 파일을 업로드 해주세요.</span>
                    <span>카드사 정책으로 인해 불러오지 못한 구독도 모두 확인할 수 있어요.</span>
                </div>
                <button
                    type="button"
                    onClick={onClick}
                    className="btn btn-scordi btn-md text-15 flex items-center gap-1"
                >
                    <Sparkles />
                    엑셀로 구독 불러오기
                </button>
            </section>
        </AnimatedModal>
    );
};
