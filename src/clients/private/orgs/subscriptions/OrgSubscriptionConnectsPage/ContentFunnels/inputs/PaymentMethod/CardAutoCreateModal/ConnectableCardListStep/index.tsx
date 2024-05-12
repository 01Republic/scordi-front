import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import React, {memo, useEffect, useState} from 'react';
import {useNewCodefCards} from '^models/CodefCard/hook';
import {codefAccountIdParamState} from '^atoms/common';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {FaChevronLeft} from 'react-icons/fa6';
import {LoadableBox} from '^components/util/loading';
import {ConnectableCardItem} from './ConnectableCardItem';
import {ConnectableCardListSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PaymentMethod/CardAutoCreateModal/ConnectableCardListStep/ConnectableCardListSection';
import {CreateCreditCardButton} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/PaymentMethod/CardAutoCreateModal/ConnectableCardListStep/CreateCreditCardButton';

interface ConnectableCardListStepProps {
    cardCompany: CardAccountsStaticData;
    setCompany: (cardCompanyData?: CardAccountsStaticData) => any;
    codefAccount: CodefAccountDto;
    onSubmit: () => any;
}

export const ConnectableCardListStep = memo((props: ConnectableCardListStepProps) => {
    const {cardCompany, setCompany, codefAccount, onSubmit} = props;
    const {search, result, isLoading} = useNewCodefCards(codefAccountIdParamState);
    const [checkedCards, setCheckedCards] = useState<CodefCardDto[]>([]);

    useEffect(() => {
        search(
            {
                where: {accountId: codefAccount.id, isSleep: false},
                sync: true,
                itemsPerPage: 0,
            },
            false,
            true,
        );
    }, []);

    const notConnectedCards = result.items.filter((card) => !card.creditCardId);
    const connectedCards = result.items.filter((card) => card.creditCardId);

    return (
        <div className="flex flex-col items-stretch">
            <div className="mb-4">
                <div className="mb-4">
                    <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={() => setCompany(undefined)} />
                </div>
                <p className="font-medium text-12 text-scordi mb-1">{cardCompany.displayName}에서 등록하기</p>
                <h3 className="font-bold text-xl leading-tight">
                    새로 등록할 카드를 <br /> 선택해주세요.
                </h3>
            </div>

            <div className="mb-8">
                <LoadableBox isLoading={isLoading} noPadding>
                    {!!notConnectedCards.length && (
                        <ConnectableCardListSection
                            cardCompany={cardCompany}
                            codefCards={notConnectedCards}
                            checkedCards={checkedCards}
                            setCheckedCards={setCheckedCards}
                        />
                    )}

                    {connectedCards.map((codefCard, i) => (
                        <ConnectableCardItem key={i} cardCompany={cardCompany} codefCard={codefCard} />
                    ))}

                    {!notConnectedCards.length && (
                        <div className="py-14 text-gray-400 text-center text-14 font-medium">
                            이미 모든 카드가 연결되어있네요!
                        </div>
                    )}
                </LoadableBox>
            </div>

            {!isLoading && (
                <div className="py-4">
                    {notConnectedCards.length ? (
                        <CreateCreditCardButton checkedCards={checkedCards} onSubmit={onSubmit} />
                    ) : (
                        <button
                            type="button"
                            className={`btn btn-block btn-scordi`}
                            onClick={() => setCompany(undefined)}
                        >
                            돌아가기
                        </button>
                    )}
                </div>
            )}
        </div>
    );
});
ConnectableCardListStep.displayName = 'ConnectableCardListStep';
