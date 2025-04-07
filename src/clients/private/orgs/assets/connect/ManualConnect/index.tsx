import { MainLayout } from "^clients/private/_layouts/MainLayout";
import { MainContainer } from "^clients/private/_layouts/MainLayout/MainContainer";
import { CreateBankAccountRequestDto } from "^models/BankAccount/type";
import { BankAccountsStaticData } from "^models/CodefAccount/bank-account-static-data";
import { CardAccountsStaticData } from "^models/CodefAccount/card-accounts-static-data";
import { CreateCreditCardDto } from "^models/CreditCard/type";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { BankSelectionSection } from "./BankSelectionSection";
import { BusinessTypeSection } from "./BusinessTypeSection";
import { CardSelectionSection } from "./CardSelectionSection";

export const ManualConnectPage = memo(() => {
    const [isPersonal, setIsPersonal] = useState(false);
    const bankForm = useForm<CreateBankAccountRequestDto>();
    const cardForm = useForm<CreateCreditCardDto>();
    const [selectedBank, setSelectedBank] = useState<BankAccountsStaticData | null>(null);
    const [selectedCard, setSelectedCard] = useState<CardAccountsStaticData | null>(null);

    return (
        <MainLayout>
            <MainContainer>
                {!selectedCard && !selectedBank && (
                    <BusinessTypeSection
                        isPersonal={isPersonal}
                        setIsPersonal={setIsPersonal}
                    />
                )}

                {!selectedCard && (
                    <BankSelectionSection
                        onSelect={setSelectedBank}
                        selectedBank={selectedBank}
                        form={bankForm}
                        onBack={() => setSelectedBank(null)}
                        isPersonal={isPersonal}
                    />
                )}

                {!selectedBank && (
                    <CardSelectionSection
                        onSelect={setSelectedCard}
                        selectedCard={selectedCard}
                        form={cardForm}
                        onBack={() => setSelectedCard(null)}
                        isPersonal={isPersonal}
                    />
                )}

            </MainContainer>
        </MainLayout>
    );
});

ManualConnectPage.displayName = 'ManualConnectPage';
