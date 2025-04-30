import {memo, useEffect, useState} from 'react';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {useCreateCodefAccount} from '^models/CodefAccount/hooks/useCreateCodefAccount';
import {toast} from 'react-hot-toast';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {FadeUp} from '^components/FadeUp';
import {ConnectableCardSelect} from '^clients/private/_modals/credit-cards/CardAutoCreateModal/ConnectableCardListStep';
import {InputCardAccountFormDataStep} from '^clients/private/_modals/credit-cards/CardAutoCreateModal/CodefAccountConnectStep/InputCardAccountFormDataStep';
import {debounce} from 'lodash';

interface ConnectCodefAccountModalProps extends ModalProps {
    cardCompany: CardAccountsStaticData;
    onSubmit: (codefCard: CodefCardDto) => any;
    // 함수가 주어지면, 병합 가능한 모드로 연결 모달을 실행합니다.
    onMergeSubmit?: (codefCard: CodefCardDto) => any;
}

export const ConnectCodefAccountModal = memo((props: ConnectCodefAccountModalProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {isOpened, onClose, cardCompany, onSubmit, onMergeSubmit} = props;
    const [isPreChecked, setIsPreChecked] = useState(false);
    const [codefAccount, setCodefAccount] = useState<CodefAccountDto>();
    const setCodefAccountId = useSetRecoilState(codefAccountIdParamState);
    const {checkExists, form, createAccount, isLoading, errorMessages} = useCreateCodefAccount(orgId);

    const close = () => {
        setCodefAccount(undefined);
        onClose();
    };

    const setAccount = (codefAccount?: CodefAccountDto) => {
        setCodefAccount(codefAccount);
        codefAccount && setCodefAccountId(codefAccount.id);
    };

    const loginIfAccountExist = debounce(() => {
        checkExists(cardCompany.param, cardCompany.clientType, (existedAccount) => {
            if (existedAccount) {
                toast.success(`${existedAccount.company}에 로그인했어요`);
            }
            setAccount(existedAccount);
            setIsPreChecked(true);
        });
    }, 500);

    useEffect(() => {
        if (!isOpened) return;
        if (!cardCompany?.param) return;
        loginIfAccountExist();
    }, [isOpened, cardCompany.param]);

    return (
        <SlideUpModal
            open={isOpened}
            onClose={close}
            size="md"
            minHeight="min-h-screen sm:min-h-[90%]"
            maxHeight="max-h-screen sm:max-h-[90%]"
            modalClassName="rounded-none sm:rounded-t-box flex flex-col items-stretch"
        >
            {isPreChecked && !codefAccount && (
                <InputCardAccountFormDataStep
                    cardCompany={cardCompany}
                    form={form}
                    onBack={() => {
                        setAccount(undefined);
                        onClose();
                    }}
                    onSubmit={(dto) => {
                        createAccount(orgId, cardCompany, dto, (createdAccount) => {
                            toast.success(`${createdAccount.company}에 안전하게 연결되었어요 :)`);
                            setAccount(createdAccount);
                        });
                    }}
                    isLoading={isLoading}
                    errorMessages={errorMessages}
                />
            )}

            <FadeUp show={!!codefAccount} delay="delay-[50ms]" className="flex-grow flex flex-col items-stretch">
                {codefAccount && (
                    <ConnectableCardSelect
                        cardCompany={cardCompany}
                        codefAccount={codefAccount}
                        onBack={() => {
                            setAccount(undefined);
                        }}
                        onSubmit={onSubmit}
                        onMergeSubmit={onMergeSubmit}
                    />
                )}
            </FadeUp>
        </SlideUpModal>
    );
});
ConnectCodefAccountModal.displayName = 'ConnectCodefAccountModal';
