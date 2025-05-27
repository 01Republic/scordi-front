import React, {Dispatch, memo, SetStateAction} from 'react';
import {Landmark} from 'lucide-react';
import {useOrgIdParam} from '^atoms/common';
import {useCodefCardsByCompanies, useFindCardAccounts} from '^models/CodefCard/hook';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {cardAccountsStaticData, CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {ContentSection} from '../../../common/ContentSection';
import {ConnectedItem} from '../../../AssetConnectSuccessPageTemplate/ConnectedItem';
import {useList} from '^hooks/useResource';

interface SuccessConnectCardSelectorProps {
    companies?: CardAccountsStaticData[];
    selectedCodefCards: CodefCardDto[];
    setSelectedCodefCards: Dispatch<SetStateAction<CodefCardDto[]>>;
}

export const SuccessConnectCardSelector = memo((props: SuccessConnectCardSelectorProps) => {
    const {companies = [], selectedCodefCards = [], setSelectedCodefCards} = props;

    const orgId = useOrgIdParam();
    const {data: codefCards, isFetching} = useCodefCardsByCompanies(orgId, companies);

    const isAllSelected = codefCards.length > 0 && selectedCodefCards.length === codefCards.length;
    const handleSelectAll = () => setSelectedCodefCards(isAllSelected ? [] : codefCards);

    const handleToggle = (item: CodefCardDto) => {
        setSelectedCodefCards((prev) => {
            return prev.some(({id}) => id === item.id) // included?
                ? prev.filter(({id}) => id !== item.id) // remove
                : [...prev, item]; // add
        });
    };

    return (
        <ContentSection
            text="카드"
            isAllSelected={isAllSelected}
            handleSelectAll={handleSelectAll}
            isLoading={isFetching}
        >
            <ul className="grid grid-cols-2 gap-3">
                {codefCards.map((codefCardAccount) => {
                    const cardAccount = codefCardAccount.account?.company;
                    const companyLogo = cardAccountsStaticData.find((data) => data.displayName === cardAccount);

                    return (
                        <ConnectedItem
                            key={codefCardAccount.id}
                            mainText={codefCardAccount.resCardName || ''}
                            subText={codefCardAccount.number4 || '알수없음'}
                            url={companyLogo?.logo}
                            icon={<Landmark className="w-full h-full text-white" />}
                            isSelected={selectedCodefCards.some((codefCard) => codefCard.id === codefCardAccount.id)}
                            onClick={() => handleToggle(codefCardAccount)}
                        />
                    );
                })}
            </ul>
        </ContentSection>
    );
});
