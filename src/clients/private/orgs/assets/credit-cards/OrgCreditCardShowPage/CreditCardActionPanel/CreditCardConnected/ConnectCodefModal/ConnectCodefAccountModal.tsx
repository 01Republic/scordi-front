import React, {memo, useState} from 'react';
import {FadeUp} from '^components/FadeUp';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefAccountFetchCardsResult} from '^models/CodefAccount/hook';
import {ConnectableCardSelect} from '^clients/private/_modals/credit-cards/CardAutoCreateModal/ConnectableCardListStep/ConnectableCardSelect';
import {CodefAccountConnectStep} from '^clients/private/_modals/credit-cards/CardAutoCreateModal/CodefAccountConnectStep';

interface ConnectCodefAccountModalProps extends ModalProps {
    cardCompany: CardAccountsStaticData;
    onSubmit: (codefCard: CodefCardDto) => any;
    // 함수가 주어지면, 병합 가능한 모드로 연결 모달을 실행합니다.
    onMergeSubmit?: (codefCard: CodefCardDto) => any;
}

/**
 * 코드에프 계정연결모달
 * 수동등록된 카드에 대한 계정연결을 위하여 사용합니다.
 */
export const ConnectCodefAccountModal = memo((props: ConnectCodefAccountModalProps) => {
    const {isOpened, onClose, cardCompany, onSubmit, onMergeSubmit} = props;
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
                {/* 만약 선택된 카드사에 계정이 없으면 로그인 폼을 띄워준다. */}
                {isOpened &&
                    cardCompany &&
                    (!codefAccountFetchCardsResults || codefAccountFetchCardsResults.length <= 0) && (
                        <CodefAccountConnectStep
                            onBack={() => close()}
                            cardCompany={cardCompany}
                            setAccountFetchCardsResults={setCodefAccountFetchCardsResults}
                        />
                    )}

                {/* 연결할 카드 선택 스텝 */}
                <FadeUp
                    show={codefAccountFetchCardsResults && codefAccountFetchCardsResults.length > 0}
                    className="h-full"
                >
                    {codefAccountFetchCardsResults && codefAccountFetchCardsResults.length > 0 && (
                        <ConnectableCardSelect
                            cardCompany={cardCompany}
                            codefAccountFetchCardsResults={codefAccountFetchCardsResults}
                            setCodefAccountFetchCardsResults={setCodefAccountFetchCardsResults}
                            onBack={() => close()}
                            onSubmit={onSubmit}
                            onMergeSubmit={onMergeSubmit}
                        />
                    )}
                </FadeUp>
            </div>
        </SlideUpModal>
    );
});
ConnectCodefAccountModal.displayName = 'ConnectCodefAccountModal';
