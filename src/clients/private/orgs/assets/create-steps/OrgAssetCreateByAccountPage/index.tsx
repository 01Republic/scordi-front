import {memo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CreateCreditCardDto} from '^models/CreditCard/type';
import {MainLayout} from '^clients/private/_layouts/MainLayout';
import {MainContainer} from '^clients/private/_layouts/MainLayout/MainContainer';
import {InputCardFormDataStep} from '^clients/private/_modals/credit-cards/CardManualCreateModal/InputCardFormDataStep';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {BusinessTypeSection} from '../common/BusinessTypeSection';
import {ConnectMethodCard} from '../common/ConnectMethodCard';

export const OrgAssetCreateByAccountPage = memo(() => {
    const [isPersonal, setIsPersonal] = useState(false);
    const cardForm = useForm<CreateCreditCardDto>();
    const [selectedCard, setSelectedCard] = useState<CardAccountsStaticData | null>(null);
    const [isOpened, setIsOpened] = useState(false);

    const handleCardSelect = (card: CardAccountsStaticData) => {
        if (selectedCard?.param === card.param) {
            setSelectedCard(null);
            setIsOpened(false);
        } else {
            setSelectedCard(card);
            setIsOpened(true);
        }
    };

    return (
        <MainLayout>
            <MainContainer>
                <BusinessTypeSection isPersonal={isPersonal} setIsPersonal={setIsPersonal} />

                <h2 className="leading-none text-xl font-semibold mb-4">카드</h2>
                <div className="grid grid-cols-2 md2:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {CardAccountsStaticData.findByPersonal(isPersonal).map((card, i) => (
                        <div key={i}>
                            <ConnectMethodCard
                                logo={card.logo}
                                title={card.displayName}
                                onClick={() => handleCardSelect(card)}
                            />
                        </div>
                    ))}
                </div>

                <SlideUpModal
                    open={isOpened}
                    onClose={close}
                    size="md"
                    minHeight="min-h-screen sm:min-h-[90%]"
                    maxHeight="max-h-screen sm:max-h-[90%]"
                    modalClassName="rounded-none sm:rounded-t-box"
                >
                    <div className="absolute inset-0 p-6">
                        {selectedCard && (
                            <InputCardFormDataStep
                                cardCompany={selectedCard!}
                                onBack={() => {
                                    setSelectedCard(null);
                                    setIsOpened(false);
                                }}
                                onSubmit={() => {}}
                                isLoading={false}
                            />
                        )}
                    </div>
                </SlideUpModal>
            </MainContainer>
        </MainLayout>
    );
});

OrgAssetCreateByAccountPage.displayName = 'OrgAssetCreateByAccountPage';
