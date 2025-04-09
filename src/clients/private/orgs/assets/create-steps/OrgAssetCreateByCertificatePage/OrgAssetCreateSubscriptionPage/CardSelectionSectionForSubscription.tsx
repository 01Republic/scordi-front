import { CardAccountsStaticData } from "^models/CodefAccount/card-accounts-static-data";
import { memo } from "react";
import { SelectAllToggle } from "../SelectAllToggle";
import { BankOrCardForSubscription } from './BankOrCardForSubscription';

interface CardSelectionSectionForSubscriptionProps {
    selectedCards: CardAccountsStaticData[];
    onSelect: (card: CardAccountsStaticData) => void;
    onSelectAll: () => void;
    canSelect: boolean;
}

export const CardSelectionSectionForSubscription = memo((props: CardSelectionSectionForSubscriptionProps) => {
    const { selectedCards, onSelect, onSelectAll, canSelect } = props;
    const cards = CardAccountsStaticData.findByPersonal(false);

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between py-4">
                <h2 className="leading-none text-xl font-semibold mb-2">카드</h2>
                {canSelect && (
                    <SelectAllToggle
                        isAllSelected={selectedCards.length === cards.length}
                        onClick={onSelectAll}
                        label="카드 전체 선택"
                    />
                )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                {cards.map((card) => (
                    <BankOrCardForSubscription
                        key={card.param}
                        logo={card.logo}
                        title={card.displayName}
                        isSelected={selectedCards.some((c) => c.param === card.param)}
                        onClick={() => canSelect && onSelect(card)}
                    />
                ))}
            </div>
        </div>
    );
});

CardSelectionSectionForSubscription.displayName = 'CardSelectionSectionForSubscription';
