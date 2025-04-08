import {memo, useState} from 'react';
import {NextImage} from '^components/NextImage';
import {BankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {Button} from '^public/components/ui/button';
import {MainLayout} from '^clients/private/_layouts/MainLayout';
import {MainContainer} from '^clients/private/_layouts/MainLayout/MainContainer';
import {BankSelectionSectionForSubscription} from './BankSelectionSectionForSubscription';
import {BusinessTypeSectionForSubscription} from './BusinessTypeSectionForSubscription';
import {CardSelectionSectionForSubscription} from './CardSelectionSectionForSubscription';
import ClappingHands from '/src/images/ClappingHands.png';

export const OrgAssetCreateSubscriptionPage = memo(() => {
    const [step, setStep] = useState(1);
    const [isPersonal, setIsPersonal] = useState(false);
    const [selectedBanks, setSelectedBanks] = useState<BankAccountsStaticData[]>([]);
    const [selectedCards, setSelectedCards] = useState<CardAccountsStaticData[]>([]);

    const handleSelectBank = (bank: BankAccountsStaticData) => {
        if (selectedBanks.some((b) => b.param === bank.param)) {
            setSelectedBanks(selectedBanks.filter((b) => b.param !== bank.param));
        } else {
            setSelectedBanks([...selectedBanks, bank]);
        }
    };

    const handleSelectCard = (card: CardAccountsStaticData) => {
        if (selectedCards.some((c) => c.param === card.param)) {
            setSelectedCards(selectedCards.filter((c) => c.param !== card.param));
        } else {
            setSelectedCards([...selectedCards, card]);
        }
    };

    const handleSelectAllBanks = () => {
        if (selectedBanks.length === BankAccountsStaticData.findByPersonal(isPersonal).length) {
            setSelectedBanks([]);
        } else {
            setSelectedBanks(BankAccountsStaticData.findByPersonal(isPersonal));
        }
    };

    const handleSelectAllCards = () => {
        if (selectedCards.length === CardAccountsStaticData.findByPersonal(isPersonal).length) {
            setSelectedCards([]);
        } else {
            setSelectedCards(CardAccountsStaticData.findByPersonal(isPersonal));
        }
    };

    return (
        <MainLayout>
            <MainContainer>
                {step === 1 && (
                    <div className="mb-12 space-y-2">
                        <NextImage src={ClappingHands} alt="clapping hands" width={60} height={60} />
                        <div className="text-2xl font-bold">자산 연동이 완료 되었어요</div>
                    </div>
                )}

                {step === 2 && (
                    <BusinessTypeSectionForSubscription isPersonal={isPersonal} setIsPersonal={setIsPersonal} />
                )}

                <BankSelectionSectionForSubscription
                    onSelect={handleSelectBank}
                    selectedBanks={selectedBanks}
                    onSelectAll={handleSelectAllBanks}
                    canSelect={step === 2}
                />

                <CardSelectionSectionForSubscription
                    onSelect={handleSelectCard}
                    selectedCards={selectedCards}
                    onSelectAll={handleSelectAllCards}
                    canSelect={step === 2}
                />

                <div className="flex justify-center">
                    <Button
                        variant="scordi"
                        size="lg"
                        className="w-64"
                        onClick={() => {
                            setStep(step === 1 ? step + 1 : step - 1);
                        }}
                        disabled={step === 2 && (selectedBanks.length === 0 || selectedCards.length === 0)}
                    >
                        다음
                    </Button>
                </div>
            </MainContainer>
        </MainLayout>
    );
});

OrgAssetCreateSubscriptionPage.displayName = 'OrgAssetCreateSubscriptionPage';
