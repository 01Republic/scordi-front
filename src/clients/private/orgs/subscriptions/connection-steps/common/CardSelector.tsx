import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useFormContext} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {orgIdParamState} from '^atoms/common';
import {useCodefAccount} from '^models/CodefCard/hook';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCardCompanyCode, CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {confirm3} from '^components/util/dialog/confirm3';
import {ConnectStepsModal} from '../selectInstitutionsSection/ByAccountPage/ConnectStepsModal';
import {AllSelectInstitutionOptions} from './AllSelectInstitutionOptions';
import {InstitutionOption} from './InstitutionOption';

export const CardSelector = memo(() => {
    const orgId = useRecoilValue(orgIdParamState);
    const {useCodefAccountRemove, useCodefAccountsInConnector} = useCodefAccount();
    const {setValue, getValues} = useFormContext<CreateAccountRequestDto>();
    const [selectedCards, setSelectedCards] = useState<CardAccountsStaticData[]>([]);
    const [cardCompany, setCardCompany] = useState<CardAccountsStaticData>();
    const [isConnectStepsModalOpen, setIsConnectStepsModalOpen] = useState(false);

    const clientType = getValues('clientType') || CodefCustomerType.Business;
    const loginType = getValues('loginType');

    const {data: connectCodefAccount} = useCodefAccountsInConnector(orgId, {
        itemsPerPage: 0,
        sync: true,
        where: {loginType},
    });

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

    const onDisconnect = async (institution: string, accountId?: number) => {
        if (!accountId) return;

        const isConfirmed = await confirm3(
            '기관 연동을 해제할까요?',
            <span className="text-16 text-grayColor-800 font-normal">
                "{institution}"에 연결된 모든 카드를 함께 연동 해제할까요?
                <br />
                <br />
                기관 연동을 해제하면 연결된 내역도 더이상 가져올 수 없어요. <br />
                그래도 해제할까요?
            </span>,
        ).then((res) => res.isConfirmed);
        if (!isConfirmed) return;
        useCodefAccountRemove({orgId, accountId});
        toast.success('연결을 해제했어요.');
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
                    const connectedAccount = connectCodefAccount?.items.find(
                        (account) => account.company === card.displayName,
                    );
                    const isConnected = !!connectedAccount;

                    return (
                        <>
                            <InstitutionOption
                                key={card.param}
                                logo={card.logo}
                                title={card.displayName}
                                connect={isConnected}
                                isSelected={selectedCards.some((b) => b.param === card.param)}
                                isAllSelected={isAllSelected}
                                isDisabled={disabledCardParams.includes(card.param)}
                                onClick={() => handleSelectCard(card)}
                                onDisconnect={() => onDisconnect(card.displayName, connectedAccount?.id)}
                            />
                        </>
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
