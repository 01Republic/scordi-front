import React, {memo, useState} from 'react';
import {useCurrentCreditCard} from '../../atom';
import {ConnectCodefModal} from './ConnectCodefModal';
import {codefCardApi} from '^models/CodefCard/api';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useCodefCardsOfCreditCardShow2} from '^models/CodefCard/hook';
import {creditCardApi} from '^models/CreditCard/api';
import {confirm2, confirmed} from '^components/util/dialog';
import {useRouter} from 'next/router';
import {OrgCreditCardShowPageRoute} from '^pages/orgs/[id]/creditCards/[creditCardId]';
import {Sparkles} from 'lucide-react';

export const NewSyncWithCodefApi = memo(() => {
    const orgId = useOrgIdParam();
    const creditCardId = useIdParam('creditCardId');
    const router = useRouter();
    const {currentCreditCard} = useCurrentCreditCard();
    const {isSyncRunning, syncCard} = useCodefCardSync();
    const {refetch} = useCodefCardsOfCreditCardShow2(creditCardId);
    const [isConnectModalOpened, setIsConnectModalOpened] = useState(false);

    if (!currentCreditCard) return <></>;

    const onClick = () => setIsConnectModalOpened(true);

    const connectCodefCard = async (codefCard: CodefCardDto) => {
        codefCardApi
            .connectCreditCard(orgId, codefCard.id, currentCreditCard.id)
            .then((res) => {
                setIsConnectModalOpened(false);
                toast.success('연결 완료! 동기화를 시작합니다.');
                return refetch().then(() => syncCard(orgId, res.data));
            })
            .catch(errorToast);
    };

    const mergeCard = async (codefCard: CodefCardDto) => {
        const id = currentCreditCard.id;
        const hostCardId = codefCard.creditCardId;

        if (!hostCardId) {
            toast.error('다른 카드에 연결되어있지 않아 이 카드에 바로 연결할게요!');
            return connectCodefCard(codefCard);
        } else {
            const mergeConfirm = () => {
                return confirm2(
                    '다른 카드와 병합할까요?',
                    <div className="">
                        <div>선택하신 카드는, 이미 다른 카드 중 하나와 연동되어있어요.</div>
                        <br />
                        <div>연동된 다른 카드로 이 카드 정보를 모두 넘기고</div>
                        <div>두 카드가 하나로 합쳐집니다.</div>
                        <br />
                        <div className="bg-red-50 rounded-lg p-4 text-13">
                            <div className="text-14 font-semibold mb-2">
                                안심하세요 <span className="text-16">💁‍♀</span>️
                            </div>
                            <div>이 과정은 카드사나 금융거래정보 등 스코디 외부에 영향을 주지 않아요.</div>
                            <div>스코디에서만 하나의 카드로 표현될 거에요.</div>
                        </div>
                        <br />
                        <div>계속 실행을 원하시면 확인 버튼을 클릭해주세요.</div>
                    </div>,
                );
            };

            confirmed(mergeConfirm())
                .then(() => creditCardApi.mergeCard(orgId, id, hostCardId))
                .then(() => toast.success('병합 완료! 병합한 카드로 이동합니다.'))
                .then(() => router.replace(OrgCreditCardShowPageRoute.path(orgId, hostCardId)))
                .catch(errorToast);
        }
    };

    return (
        <>
            <button
                className={`btn btn-scordi no-animation btn-animation gap-2 ${isSyncRunning ? 'link_to-loading' : ''}`}
                onClick={onClick}
            >
                <Sparkles />
                <span>연결</span>
            </button>
            <ConnectCodefModal
                isOpened={isConnectModalOpened}
                onClose={() => setIsConnectModalOpened(false)}
                creditCard={currentCreditCard}
                onSubmit={connectCodefCard}
                onMergeSubmit={mergeCard}
            />
        </>
    );
});
NewSyncWithCodefApi.displayName = 'NewSyncWithCodefApi';
