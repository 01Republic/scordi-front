import {memo, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefCardCompanyCode, CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {AllSelectInstitutionOptions} from './AllSelectInstitutionOptions';
import {InstitutionOption} from './InstitutionOption';

export const CardSelector = memo(() => {
    const {setValue, getValues} = useFormContext<CreateAccountRequestDto>();
    const [selectedCards, setSelectedCards] = useState<CardAccountsStaticData[]>([]);

    const clientType = getValues('clientType') || CodefCustomerType.Business;
    const isCertificateLoginType = getValues('loginType') === CodefLoginType.Certificate;

    // 공동인증서 연동 시 롯데,하나,삼성은 연동불가
    const disabledCardParams = isCertificateLoginType
        ? [CodefCardCompanyCode.롯데카드, CodefCardCompanyCode.하나카드, CodefCardCompanyCode.삼성카드]
        : [];

    const cards = CardAccountsStaticData.findByClientType(clientType);
    const selectableCards = cards.filter((card) => !disabledCardParams.includes(card.param));
    const isAllSelected = selectedCards.length === selectableCards.length;

    const handleSelectCard = (card: CardAccountsStaticData) => {
        if (disabledCardParams.includes(card.param)) return;

        if (selectedCards.some((c) => c.param === card.param)) {
            setSelectedCards(selectedCards.filter((c) => c.param !== card.param));
        } else {
            setSelectedCards([...selectedCards, card]);
        }
    };

    const handleSelectAllCards = () => {
        if (isAllSelected) {
            setSelectedCards([]);
        } else {
            setSelectedCards(selectableCards);
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
                        isAllSelected={isAllSelected}
                        isDisabled={disabledCardParams.includes(card.param)}
                        onClick={() => handleSelectCard(card)}
                    />
                ))}
            </div>
        </section>
    );
});
