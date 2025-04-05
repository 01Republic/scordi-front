import { MainLayout } from '^clients/private/_layouts/MainLayout';
import { MainContainer } from '^clients/private/_layouts/MainLayout/MainContainer';
import { BankAccountsStaticData } from '^models/CodefAccount/bank-account-static-data';
import { CardAccountsStaticData } from '^models/CodefAccount/card-accounts-static-data';
import { useState } from 'react';
import { BusinessTypeSection } from '../ManualConnect/BusinessTypeSection';
import { BankSelectionSection } from './BankSelectionSection';
import { CardSelectionSection } from './CardSelectionSection';

export const AutoConnectPage = () => {
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
                <BusinessTypeSection
                    isPersonal={isPersonal}
                    setIsPersonal={setIsPersonal}
                />

                <BankSelectionSection
                    onSelect={handleSelectBank}
                    selectedBanks={selectedBanks}
                    onSelectAll={handleSelectAllBanks}
                />

                <CardSelectionSection
                    onSelect={handleSelectCard}
                    selectedCards={selectedCards}
                    onSelectAll={handleSelectAllCards}
                />

            </MainContainer>
        </MainLayout>
    );
};