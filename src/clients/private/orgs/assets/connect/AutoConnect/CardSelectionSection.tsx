import { CardAccountsStaticData } from "^models/CodefAccount/card-accounts-static-data";
import { FinancialInstitutionCard } from './FinancialInstitutionCard';
import { SelectAllToggle } from './SelectAllToggle';

export const CardSelectionSection = ({
    selectedCards,
    onSelect,
    onSelectAll
}: {
    selectedCards: CardAccountsStaticData[];
    onSelect: (card: CardAccountsStaticData) => void;
    onSelectAll: () => void;
}) => {
    const cards = CardAccountsStaticData.findByPersonal(false);
    return (
        <div>
            <div className="flex items-center justify-between py-4">
                <h2 className="leading-none text-xl font-semibold mb-2">카드</h2>
                <SelectAllToggle
                    isAllSelected={selectedCards.length === cards.length}
                    onClick={onSelectAll}
                    label="카드 전체 선택"
                />
            </div>
            <div className="grid grid-cols-2 md2:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {cards.map((card) => (
                    <FinancialInstitutionCard
                        key={card.param}
                        logo={card.logo}
                        title={card.displayName}
                        isSelected={selectedCards.some((c) => c.param === card.param)}
                        onClick={() => onSelect(card)}
                    />
                ))}
            </div>
        </div>
    );
}; 