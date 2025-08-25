import {memo} from 'react';
import {Dot} from 'lucide-react';
import {BasicModal} from '^components/modals/_shared/BasicModal';

interface NeedCheckSubscriptionIssueModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const NeedCheckSubscriptionIssueModal = memo((props: NeedCheckSubscriptionIssueModalProps) => {
    const {isOpened, onClose} = props;
    return (
        <BasicModal open={isOpened} onClose={onClose}>
            <section className="modal-box p-8 max-w-lg flex flex-col justify-between gap-5 keep-all">
                <div className="flex flex-col gap-3">
                    <p className="font-semibold text-24">확인이 필요한 구독이에요!</p>
                    <p className="text-16 font-medium text-gray-400">
                        갱신일이 지났음에도 결제되지 않은 구독이 있어요. <br /> 주말/공휴일, 카드사/은행사/서비스 문제로
                        인해 일자가 밀려 결제되지 않았을 수도 있어요. 하지만 아래와 같은 문제도 직접 확인해주셔야 하는
                        구독인 경우도 있어요.
                    </p>
                    <div className="flex flex-col text-gray-700 gap-1">
                        <div className="flex items-start gap-1">
                            <Dot className="stroke-[8] shrink-0 mt-1" />
                            구독 해지 상태를 반영하지 않은 경우
                        </div>
                        <div className="flex items-start gap-1">
                            <Dot className="stroke-[8] shrink-0 mt-1" />
                            결제수단/요금제 플랜 변경 이후 구독 병합을 하지 않은 경우
                        </div>
                        <div className="flex items-start gap-1">
                            <Dot className="stroke-[8] shrink-0 mt-1" />
                            카드사 계정 정보가 변동된 경우
                        </div>
                        <div className="flex items-start gap-1">
                            <Dot className="stroke-[8] shrink-0 mt-1" />
                            카드사 계정/인증서 연결이 만료된 경우
                        </div>
                        <div className="flex items-start gap-1">
                            <Dot className="stroke-[8] shrink-0 mt-1" />
                            카드가 해지되거나 만료된 경우
                        </div>
                    </div>
                </div>
                <button type="button" onClick={onClose} className="btn btn-md bg-gray-200 text-gray-500 no-animation">
                    닫기
                </button>
            </section>
        </BasicModal>
    );
});
