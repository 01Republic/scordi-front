import React, {Dispatch, memo, SetStateAction} from 'react';
import {useRecoilValue} from 'recoil';
import {CreditCard} from 'lucide-react';
import {orgIdParamState} from '^atoms/common';
import {CreditCardDto} from '^models/CreditCard/type';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useSomeCreditCards} from '^models/CreditCard/hook';
import {ConnectedItem} from './ConnectedItem';

interface ConnectionSuccessAccountSectionProps {
    successCodefCards: CodefCardDto[];
    selectedCodefCards: CodefCardDto[];
    setSelectedCodefCards: Dispatch<SetStateAction<CodefCardDto[]>>;
}

export const SuccessCreditCardSection = memo((props: ConnectionSuccessAccountSectionProps) => {
    const {successCodefCards, selectedCodefCards, setSelectedCodefCards} = props;

    const orgId = useRecoilValue(orgIdParamState);
    const codefCardIds = successCodefCards.map((codefCard) => codefCard.creditCardId);
    const {data: creditCards, isLoading} = useSomeCreditCards(orgId, codefCardIds);

    const isAllSelected = successCodefCards.length > 0 && selectedCodefCards.length === successCodefCards.length;

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedCodefCards([]);
        } else setSelectedCodefCards(successCodefCards);
    };

    const handleToggle = (card: CreditCardDto) => {
        const target = successCodefCards.find((codefCard) => codefCard.creditCardId === card.id);
        if (!target) return;

        setSelectedCodefCards((prev) =>
            prev.some((item) => item.creditCardId === target.creditCardId)
                ? prev.filter((item) => item.creditCardId !== target.creditCardId)
                : [...prev, target],
        );
    };

    return (
        <section className="flex flex-col gap-5 ">
            <div className="flex items-center justify-between">
                <span className="text-xl text-gray-900 font-semibold">계좌</span>

                {creditCards.length > 1 && (
                    <button
                        type="button"
                        onClick={handleSelectAll}
                        className="text-scordi cursor-pointer text-base hover:underline "
                    >
                        {isAllSelected ? '선택취소' : '전체선택'}
                    </button>
                )}
            </div>

            <ul className="grid grid-cols-2 gap-3">
                {creditCards.map((creditCard) => {
                    const company = creditCard.company;
                    const endNumber = creditCard?.secretInfo.number4 || '알수없음';

                    return (
                        <ConnectedItem
                            key={creditCard.id}
                            url={company?.logo}
                            mainText={creditCard?.name || ''}
                            subText={endNumber}
                            icon={<CreditCard className="h-full w-full size-10" />}
                            isSelected={selectedCodefCards.some((item) => item.creditCardId === creditCard.id)}
                            onClick={() => handleToggle(creditCard)}
                        />
                    );
                })}
            </ul>
        </section>
    );
});
