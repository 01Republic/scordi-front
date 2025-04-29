import React, {memo, useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCardCompanyCode, CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {ConnectStepsModal} from '../selectInstitutionsSection/ByAccountPage/ConnectStepsModal';
import {AllSelectInstitutionOptions} from './AllSelectInstitutionOptions';
import {InstitutionOption} from './InstitutionOption';
import {useCodefAccountsInConnector} from '^models/CodefAccount/hook';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useRouter} from 'next/router';

export const CardSelector = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const {result, search} = useCodefAccountsInConnector();
    const {setValue, getValues} = useFormContext<CreateAccountRequestDto>();
    const [selectedCards, setSelectedCards] = useState<CardAccountsStaticData[]>([]);
    const [cardCompany, setCardCompany] = useState<CardAccountsStaticData>();
    const [isConnectStepsModalOpen, setIsConnectStepsModalOpen] = useState(false);

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        search({itemsPerPage: 0}, false, true);
    }, [router.isReady, orgId]);

    const clientType = getValues('clientType') || CodefCustomerType.Business;
    const loginType = getValues('loginType');

    // 공동인증서 연동 시 롯데,하나,삼성은 연동불가
    const disabledCardParams =
        loginType === CodefLoginType.Certificate
            ? [CodefCardCompanyCode.롯데카드, CodefCardCompanyCode.하나카드, CodefCardCompanyCode.삼성카드]
            : [];

    const cards = CardAccountsStaticData.findByClientType(clientType);
    const selectableCards = cards.filter((card) => !disabledCardParams.includes(card.param));
    const isAllSelected = selectedCards.length === selectableCards.length;

    const handleSelectCard = (card: CardAccountsStaticData) => {
        if (disabledCardParams.includes(card.param)) return;

        if (loginType === CodefLoginType.IdAccount) {
            setCardCompany(card);
            setIsConnectStepsModalOpen(true);
            return;
        }

        if (selectedCards.some((cardAccount) => cardAccount.param === card.param)) {
            setSelectedCards(selectedCards.filter((cardAccount) => cardAccount.param !== card.param));
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
                {loginType === CodefLoginType.Certificate && (
                    <AllSelectInstitutionOptions
                        isAllSelected={selectedCards.length === cards.length}
                        onClick={handleSelectAllCards}
                    />
                )}
            </div>
            <div className="grid grid-cols-5 gap-4">
                {cards.map((card) => {
                    const isConnected =
                        loginType === CodefLoginType.IdAccount
                            ? result.items.some((account) => account.company === card.displayName)
                            : false; // * TODO: 공동인증서 연동 체크 영역
                    return (
                        <InstitutionOption
                            key={card.param}
                            logo={card.logo}
                            title={card.displayName}
                            connect={isConnected}
                            isSelected={selectedCards.some((b) => b.param === card.param)}
                            isAllSelected={isAllSelected}
                            isDisabled={disabledCardParams.includes(card.param)}
                            onClick={() => handleSelectCard(card)}
                        />
                    );
                })}
            </div>

            {/* 로그인/비밀번호로 연동하는 경우 모달을 이용해 연결 */}
            {cardCompany && (
                <ConnectStepsModal
                    cardCompany={cardCompany}
                    setCardCompany={setCardCompany}
                    isConnectStepsModalOpen={isConnectStepsModalOpen}
                    setIsConnectStepsModalOpen={setIsConnectStepsModalOpen}
                />
            )}
        </section>
    );
});
