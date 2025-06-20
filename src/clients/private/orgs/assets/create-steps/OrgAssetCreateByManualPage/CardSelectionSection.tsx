import React, {memo} from 'react';
import {useForm} from 'react-hook-form';
import {CreateCreditCardDto} from '^models/CreditCard/type/CreateCreditCard.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {StatusHeader} from '^_components/pages/assets/connect-steps/common/StatusHeader';
import {SelectedCompany} from '^clients/private/orgs/assets/create-steps/common/SelectedCompany';
import {InstitutionOption} from '^_components/pages/assets/connect-steps/common/InstitutionOption';
import {CardManualForm} from './CardManualForm';

interface CardSelectionSectionProps {
    onSelect: (card: CardAccountsStaticData | null) => void;
    selectedCard: CardAccountsStaticData | null;
    isPersonal: boolean;
}

export const CardSelectionSection = memo((props: CardSelectionSectionProps) => {
    const {onSelect, selectedCard, isPersonal} = props;

    const form = useForm<CreateCreditCardDto>();
    const companies = CardAccountsStaticData.findByPersonal(isPersonal);

    const handleCardSelect = (card: CardAccountsStaticData) => {
        if (selectedCard?.param === card.param) {
            onSelect(null);
        } else {
            onSelect(card);
        }
    };

    if (!selectedCard) {
        return (
            <section className="flex flex-col gap-6">
                <h2 className="text-xl font-semibold text-neutral-900">카드</h2>

                <div className="grid grid-cols-2 md2:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {companies.map((company) => {
                        return (
                            <InstitutionOption
                                key={company.param}
                                logo={company.logo}
                                title={company.displayName}
                                onClick={() => handleCardSelect(company)}
                            />
                        );
                    })}
                </div>
            </section>
        );
    }

    return (
        <div className="w-full flex flex-col gap-5">
            <section className="flex flex-col gap-10">
                <StatusHeader
                    title="카드를 등록해주세요."
                    onBack={() => {
                        onSelect(null);
                        form.reset();
                    }}
                />
                <SelectedCompany
                    companyType="카드사"
                    selectedCompany={selectedCard.displayName}
                    onChange={() => {
                        onSelect(null);
                        form.reset();
                    }}
                />
            </section>
            <CardManualForm isPersonal={isPersonal} />
        </div>
    );
});
