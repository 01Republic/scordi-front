import Image from 'next/image';
import {X, Sparkles} from 'lucide-react';
import excelIcon from 'src/images/icon/excelIcon.png';
import {BasicModal} from '^components/modals/_shared/BasicModal';

interface UploadBillingHistoryExcelModalConfirmProps {
    isOpened: boolean;
    onClose: () => void;
    onClick: () => void;
}

export const UploadBillingHistoryExcelModalConfirm = (props: UploadBillingHistoryExcelModalConfirmProps) => {
    const {isOpened, onClose, onClick} = props;
    return (
        <BasicModal open={isOpened} onClose={onClose}>
            <div className="modal-box relative max-w-lg flex flex-col justify-between gap-5 p-8">
                <X
                    onClick={onClose}
                    className="absolute top-5 right-5 size-6 text-gray-300 hover:text-gray-200 cursor-pointer"
                />
                <section className="flex flex-col justify-start gap-1">
                    <div className="text-14 text-scordi font-medium">과거 결제내역 가져오기</div>
                    <div className="flex items-center gap-2">
                        <Image src={excelIcon} alt="excelIcon" width={32} height={32} priority />
                        <h3>엑셀로 구독을 한 번에 불러와요.</h3>
                    </div>
                </section>

                <p className="text-gray-600 text-16 whitespace-pre-wrap">
                    카드사 홈페이지에서 승인내역을 엑셀로 내려 받기 한 후, <br />
                    스코디 엑셀 양식에 맞게 파일을 업로드 해주세요. <br />
                    카드사 정책으로 인해 불러오지 못한 구독도 모두 확인할 수 있어요.
                </p>

                <section className="flex justify-center pt-4">
                    <button type="button" onClick={onClick} className="btn btn-scordi gap-1 w-1/2">
                        <Sparkles />
                        <span>엑셀로 구독 불러오기</span>
                    </button>
                </section>
            </div>
        </BasicModal>
    );
};
