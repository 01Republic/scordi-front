import React, {memo, useState} from 'react';
import {BsStars} from 'react-icons/bs';
import {useCurrentCreditCard, useCurrentCreditCardSync} from '../../atom';
import {ConnectCodefModal} from './ConnectCodefModal';
import {codefCardApi} from '^models/CodefCard/api';
import {useOrgIdParam} from '^atoms/common';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';

export const NewSyncWithCodefApi = memo(() => {
    const orgId = useOrgIdParam();
    const {currentCreditCard} = useCurrentCreditCard();
    const {isSyncRunning, syncCard} = useCodefCardSync();
    const {reload} = useCodefCardsOfCreditCardShow();
    const [isConnectModalOpened, setIsConnectModalOpened] = useState(false);

    if (!currentCreditCard) return <></>;

    const onClick = () => setIsConnectModalOpened(true);

    const connectCodefCard = async (codefCard: CodefCardDto) => {
        codefCardApi
            .connectCreditCard(orgId, codefCard.id, currentCreditCard.id)
            .then((res) => {
                setIsConnectModalOpened(false);
                toast.success('연결 완료! 동기화를 시작합니다.');
                return reload().then(() => syncCard(orgId, res.data));
            })
            .catch(errorToast);
    };

    return (
        <>
            <button
                className={`btn btn-scordi no-animation btn-animation gap-2 ${isSyncRunning ? 'link_to-loading' : ''}`}
                onClick={onClick}
            >
                <BsStars />
                <span>연결</span>
            </button>
            <ConnectCodefModal
                isOpened={isConnectModalOpened}
                onClose={() => setIsConnectModalOpened(false)}
                creditCard={currentCreditCard}
                onSubmit={connectCodefCard}
            />
        </>
    );
});
NewSyncWithCodefApi.displayName = 'NewSyncWithCodefApi';
