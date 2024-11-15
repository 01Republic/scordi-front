import {memo, useEffect, useState} from 'react';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {useCreateCodefAccount} from '^models/CodefAccount/hooks/useCreateCodefAccount';
import {InputCardAccountFormDataStep} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PaymentMethod/CardAutoCreateModal/InputCardAccountFormDataStep';
import {toast} from 'react-hot-toast';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {codefAccountIdParamState, orgIdParamState} from '^atoms/common';
import {ConnectableCardSelect} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PaymentMethod/CardAutoCreateModal/ConnectableCardListStep';
import {FadeUp} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/_common/FadeUp';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

interface ConnectCodefAccountModalProps extends ModalProps {
    cardCompany: CardAccountsStaticData;
    onSubmit: (codefCard: CodefCardDto) => any;
}

export const ConnectCodefAccountModal = memo((props: ConnectCodefAccountModalProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {isOpened, onClose, cardCompany, onSubmit} = props;
    const [isPreChecked, setIsPreChecked] = useState(false);
    const [codefAccount, setCodefAccount] = useState<CodefAccountDto>();
    const setCodefAccountId = useSetRecoilState(codefAccountIdParamState);
    const {checkExists, form, createAccount, isLoading, errorMessages} = useCreateCodefAccount();

    const setAccount = (codefAccount?: CodefAccountDto) => {
        setCodefAccount(codefAccount);
        codefAccount && setCodefAccountId(codefAccount.id);
    };

    useEffect(() => {
        if (!isOpened) return;
        if (!cardCompany?.param) return;
        checkExists(cardCompany.param, (existedAccount) => {
            if (existedAccount) {
                toast.success(`${existedAccount.company}에 로그인했어요`);
            }
            setAccount(existedAccount);
            setIsPreChecked(true);
        });
    }, [isOpened, cardCompany.param]);

    return (
        <SlideUpModal
            open={isOpened}
            onClose={onClose}
            size="md"
            minHeight="min-h-screen sm:min-h-[90%]"
            maxHeight="max-h-screen sm:max-h-[90%]"
            modalClassName="rounded-none sm:rounded-t-box"
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

            <FadeUp show={!!codefAccount} delay="delay-[50ms]">
                {codefAccount && (
                    <ConnectableCardSelect
                        cardCompany={cardCompany}
                        codefAccount={codefAccount}
                        onBack={() => {
                            setAccount(undefined);
                        }}
                        onSubmit={onSubmit}
                    />
                )}
            </FadeUp>
        </SlideUpModal>
    );
});
ConnectCodefAccountModal.displayName = 'ConnectCodefAccountModal';
