import {Dot} from 'lucide-react';
import {BasicModal} from '^components/modals/_shared/BasicModal';

interface NoSubscriptionFoundModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const BankDataFetchingIssueModal = (props: NoSubscriptionFoundModalProps) => {
    const {isOpened, onClose} = props;
    return (
        <BasicModal open={isOpened} onClose={onClose}>
            <section className="modal-box max-w-lg flex flex-col justify-between gap-5 keep-all">
                <div className="flex flex-col gap-3">
                    <p className="font-semibold text-24">찾는 구독이 없나요?</p>
                    <p className="text-16 font-medium text-gray-400">
                        기관의 점검과 일시적인 문제로 구독을 불러오지 못했을 수 있어요. 하지만 아래와 같은 문제로
                        기관에서 결제 데이터를 보내주지 않아 연결할 수 없는 경우도 있어요.
                    </p>
                    <div className="flex flex-col text-gray-700 gap-1">
                        <div className="flex items-start gap-1">
                            <Dot className="stroke-[8] shrink-0 mt-1" />
                            계좌 : 만기 정지 해지된 계좌
                        </div>
                        <div className="flex items-start gap-1">
                            <Dot className="stroke-[8] shrink-0 mt-1" />
                            카드 : 만기 정지 해지된 카드, 재발급 이전 카드, 사업체 명의가 아닌 카드, 카드사 정책에 따라
                            최근 3개월/6개월/1년 이내 결제내역만 불러오는 경우
                        </div>
                    </div>
                </div>
                <button type="button" onClick={onClose} className="btn btn-md bg-gray-200 text-gray-500 no-animation">
                    닫기
                </button>
            </section>
        </BasicModal>
    );
};
