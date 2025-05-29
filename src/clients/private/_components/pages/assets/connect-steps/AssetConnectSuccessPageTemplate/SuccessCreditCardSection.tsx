import React, {Dispatch, memo, SetStateAction} from 'react';
import {useRecoilValue} from 'recoil';
import {CreditCard} from 'lucide-react';
import {orgIdParamState} from '^atoms/common';
import {CreditCardDto} from '^models/CreditCard/type';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useSomeCreditCards} from '^models/CreditCard/hook';
import {ConnectedItem} from './ConnectedItem';

interface ConnectionSuccessAccountSectionProps {
    processedCodefCards: CodefCardDto[];
    selectedCodefCards?: CodefCardDto[];
    setSelectedCodefCards?: Dispatch<SetStateAction<CodefCardDto[]>>;
}

export const SuccessCreditCardSection = memo((props: ConnectionSuccessAccountSectionProps) => {
    const {processedCodefCards, selectedCodefCards = [], setSelectedCodefCards} = props;

    const orgId = useRecoilValue(orgIdParamState);
    const codefCardIds = processedCodefCards.map((codefCard) => codefCard.creditCardId);
    const {data: creditCards, isLoading} = useSomeCreditCards(orgId, codefCardIds);

    const isAllSelected = processedCodefCards.length > 0 && selectedCodefCards.length === processedCodefCards.length;

    const handleSelectAll = () => {
        if (!setSelectedCodefCards) return;

        setSelectedCodefCards(isAllSelected ? [] : processedCodefCards);
    };

    const handleToggle = (card: CreditCardDto) => {
        if (!setSelectedCodefCards) return;

        // 연동에 성공한 카드인지 확인하고
        const successCodefCard = processedCodefCards.find((codefCard) => codefCard.creditCardId === card.id);

        // 성공한 카드가 아닌데 클릭한 경우 그냥 무시
        if (!successCodefCard) return;

        // 토글처리
        setSelectedCodefCards((prev) => {
            const {creditCardId} = successCodefCard;

            // 이미 선택되어있는 코드에프 카드인지 확인
            const isAlreadySelected = prev.some((item) => item.creditCardId === creditCardId);

            return isAlreadySelected
                ? // 이미 선택되어있으면 빼고
                  prev.filter((item) => item.creditCardId !== creditCardId)
                : // 그렇지 않으면 추가
                  [...prev, successCodefCard];
        });
    };

    return (
        <section className="flex flex-col gap-5 ">
            <div className="flex items-center justify-between">
                <span className="text-xl text-gray-900 font-semibold">카드</span>

                {setSelectedCodefCards && creditCards.length > 1 && (
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
                            isSelected={selectedCodefCards.some(
                                (codefCard) => codefCard.creditCardId === creditCard.id,
                            )}
                            onClick={() => handleToggle(creditCard)}
                        />
                    );
                })}
            </ul>
        </section>
    );
});
