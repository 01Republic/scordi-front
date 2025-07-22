import React, {memo, useState} from 'react';
import Tippy from '@tippyjs/react';
import {Sparkles} from 'lucide-react';
import {toast} from 'react-hot-toast';
import {useOrgIdParam} from '^atoms/common';
import {errorToast} from '^api/api';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {codefCardApi} from '^models/CodefCard/api';
import {useCurrentCreditCard} from '../../atom';
import {ReConnectCodefAccountModal} from './ConnectCodefModal/ReConnectCodefAccountModal';

interface Props {
    currentCodefCard: CodefCardDto;
    isLoading: boolean;
    reload: () => Promise<any>;
}

export const RenewSyncWithCodefApi = memo(function (props: Props) {
    const {currentCodefCard, isLoading, reload} = props;

    const orgId = useOrgIdParam();
    const {currentCreditCard} = useCurrentCreditCard();
    const {isSyncRunning, syncCard} = useCodefCardSync();
    const [isConnectModalOpened, setIsConnectModalOpened] = useState(false);

    const onClick = () => setIsConnectModalOpened(true);

    if (!currentCreditCard || !currentCreditCard.company) return <></>;
    if (!currentCodefCard || !currentCodefCard.account) return <></>;
    if (!currentCodefCard.account.errorData) return <></>;

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

    const errorData = currentCodefCard.account.errorData;

    return (
        <div className="flex items-center gap-4">
            <Tippy
                content={
                    <div className="text-[13px] text-center">
                        <div>인증이 만료되었어요.</div>
                        <div>재연결이 필요합니다!</div>
                    </div>
                }
                visible={true}
            >
                <div>
                    <button
                        className={`btn btn-scordi no-animation btn-animation gap-2 ${
                            isLoading || isSyncRunning ? 'link_to-loading' : ''
                        }`}
                        onClick={onClick}
                    >
                        <Sparkles />
                        <span>재연결</span>
                    </button>
                </div>
            </Tippy>

            <ReConnectCodefAccountModal
                isOpened={isConnectModalOpened}
                onClose={() => setIsConnectModalOpened(false)}
                creditCard={currentCreditCard}
                codefCard={currentCodefCard}
                cardCompany={currentCreditCard.company}
                editCodefAccount={currentCodefCard.account}
                onSubmit={connectCodefCard}
            />
        </div>
    );
});
