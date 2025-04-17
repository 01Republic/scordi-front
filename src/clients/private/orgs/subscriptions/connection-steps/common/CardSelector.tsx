import {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefCustomerType} from '^models/CodefAccount/type/enums';
import {AllSelectInstitutionOptions} from './AllSelectInstitutionOptions';
import {InstitutionOption} from './InstitutionOption';

export const CardSelector = memo(() => {
    const {setValue, getValues} = useFormContext<CreateAccountRequestDto>();
    const [selectedCards, setSelectedCards] = useState<CardAccountsStaticData[]>([]);

    const clientType = getValues('clientType') || CodefCustomerType.Business;
    const cards = CardAccountsStaticData.findByClientType(clientType);

    const handleSelectCard = (card: CardAccountsStaticData) => {
        if (selectedCards.some((c) => c.param === card.param)) {
            setSelectedCards(selectedCards.filter((c) => c.param !== card.param));
        } else {
            setSelectedCards([...selectedCards, card]);
        }
    };

    const handleSelectAllCards = () => {
        if (selectedCards.length === CardAccountsStaticData.findByClientType(clientType).length) {
            setSelectedCards([]);
        } else {
            setSelectedCards(CardAccountsStaticData.findByClientType(clientType));
        }
    };
    return (
        <section className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-900">카드</h2>
                <AllSelectInstitutionOptions
                    isAllSelected={selectedCards.length === cards.length}
                    onClick={handleSelectAllCards}
                />
            </div>
            <div className="grid grid-cols-5 gap-4">
                {cards.map((card) => (
                    <InstitutionOption
                        key={card.param}
                        logo={card.logo}
                        title={card.displayName}
                        isSelected={selectedCards.some((b) => b.param === card.param)}
                        onClick={() => handleSelectCard(card)}
                    />
                ))}
            </div>
        </section>
    );
});
