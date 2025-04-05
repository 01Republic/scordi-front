import { MainLayout } from "^clients/private/_layouts/MainLayout";
import { MainContainer } from "^clients/private/_layouts/MainLayout/MainContainer";
import { CreateBankAccountRequestDto } from "^models/BankAccount/type";
import { BankAccountsStaticData } from "^models/CodefAccount/bank-account-static-data";
import { CardAccountsStaticData } from "^models/CodefAccount/card-accounts-static-data";
import { Button } from "^public/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BankSelectionSection } from './BankSelectionSection';
import { BusinessTypeSelector } from './BusinessTypeSelector';
import { CardSelectionSection } from './CardSelectionSection';

export const ConnectAssetContentPage = () => {
    /* TODO: 나중에 바꿔야됨 */
    const form = useForm<CreateBankAccountRequestDto>();
    const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
    const [selectedCards, setSelectedCards] = useState<string[]>([]);

    const handleBankSelect = (bank: BankAccountsStaticData) => {
        setSelectedBanks((prev) =>
            prev.includes(bank.param)
                ? prev.filter((b) => b !== bank.param)
                : [...prev, bank.param]
        );
    };

    const handleCardSelect = (card: CardAccountsStaticData) => {
        setSelectedCards((prev) =>
            prev.includes(card.param)
                ? prev.filter((c) => c !== card.param)
                : [...prev, card.param]
        );
    };

    const handleSelectAllBanks = () => {
        const allBanks = BankAccountsStaticData.findByPersonal(false);
        setSelectedBanks(
            selectedBanks.length === allBanks.length
                ? []
                : allBanks.map((b) => b.param)
        );
    };

    const handleSelectAllCards = () => {
        const allCards = CardAccountsStaticData.findByPersonal(false);
        setSelectedCards(
            selectedCards.length === allCards.length
                ? []
                : allCards.map((c) => c.param)
        );
    };

    return (
        <MainLayout>
            <MainContainer>
                <BusinessTypeSelector
                    form={form}
                />
                <BankSelectionSection
                    selectedBanks={selectedBanks}
                    onSelect={handleBankSelect}
                    onSelectAll={handleSelectAllBanks}
                />
                <CardSelectionSection
                    selectedCards={selectedCards}
                    onSelect={handleCardSelect}
                    onSelectAll={handleSelectAllCards}
                />
                <div className="flex justify-center">
                    <Button variant={'scordi'} size={'lg'} className="my-16 w-64">다음</Button>
                </div>
            </MainContainer>
        </MainLayout>
    );
};