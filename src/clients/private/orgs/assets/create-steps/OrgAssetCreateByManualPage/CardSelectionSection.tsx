
interface CardSelectionSectionProps {
    onSelect: (card: CardAccountsStaticData | null) => void;
    selectedCard: CardAccountsStaticData | null;
    form: any;
    onBack?: () => void;
    isPersonal: boolean;
}

export const CardSelectionSection = memo(function CardSelectionSection({ onSelect, selectedCard, form, onBack, isPersonal }: CardSelectionSectionProps) {
    const handleCardSelect = (card: CardAccountsStaticData) => {
        if (selectedCard?.param === card.param) {
            onSelect(null);
        } else {
            onSelect(card);
        }
    };





    return (
        <section className="relative mb-20">
            {!selectedCard && (
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
            )}

            {onBack && selectedCard && (
                <div className="mb-10 space-y-8">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-2"
                    >
                        <ArrowLeft className="w-6 h-6" />
                        <span>뒤로가기</span>
                    </button>

                    <div>
                        <h2 className="leading-none text-xl font-semibold mb-4">
                            카드를 등록해주세요.
                        </h2>
                    </div>
                </div>
            )}



            {selectedCard && (
                <div className="flex items-center gap-4 justify-end mb-5">
                    <p className="text-16 text-gray-500">
                        선택된 카드사: <b>{selectedCard.displayName}</b>
                    </p>
                    <button className="btn btn-xs btn-scordi gap-2" onClick={onBack}>
                        변경하기
                    </button>
                </div>
            )}


        </section>
    );
});

CardSelectionSection.displayName = 'CardSelectionSection';
