import React, {memo, useState} from 'react';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {CreditCardDto} from '^models/CreditCard/type';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {ConnectEditAccountNestedStep} from '^clients/private/_modals/credit-cards/CardAutoCreateModal/ConnectableCardListStep/ConnectEditAccountNestedStep';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountFetchCardsResult} from '^models/CodefAccount/hooks/fetchCodefCardsByAccountInSafe';

interface ReConnectCodefAccountModalProps extends ModalProps {
    creditCard: CreditCardDto;
    codefCard: CodefCardDto;
    cardCompany: CardAccountsStaticData;
    editCodefAccount: CodefAccountDto;
    onSubmit: (codefCard: CodefCardDto) => any;
}

export const ReConnectCodefAccountModal = memo((props: ReConnectCodefAccountModalProps) => {
    const {isOpened, onClose, creditCard, codefCard, cardCompany, editCodefAccount, onSubmit} = props;
    const [codefAccountFetchCardsResults, setCodefAccountFetchCardsResults] =
        useState<CodefAccountFetchCardsResult[]>();

    const close = () => {
        setCodefAccountFetchCardsResults(undefined);
        onClose();
    };

    return (
        <SlideUpModal
            open={isOpened}
            onClose={close}
            size="md"
            minHeight="min-h-screen sm:min-h-[90%]"
            maxHeight="max-h-screen sm:max-h-[90%]"
            modalClassName="rounded-none sm:rounded-t-box !pb-0"
        >
            <div className="absolute inset-0 px-6 pt-6">
                <div className="space-y-4 h-full">
                    <ConnectEditAccountNestedStep
                        cardCompany={cardCompany}
                        codefAccount={editCodefAccount}
                        onBack={close}
                        onNext={() => onSubmit(codefCard)}
                        setCodefAccountFetchCardsResults={setCodefAccountFetchCardsResults}
                    />
                </div>
            </div>
        </SlideUpModal>
    );
});
ReConnectCodefAccountModal.displayName = 'ReConnectCodefAccountModal';
