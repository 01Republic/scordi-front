import React, {memo, useState} from 'react';
import {Landmark} from 'lucide-react';
import {useOrgIdParam} from '^atoms/common';
import {useCodefCardsByCompanies} from '^models/CodefCard/hook';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {ContentSection} from '../../../common/ContentSection';
import {ConnectedItem} from '../../../AssetConnectSuccessPageTemplate/ConnectedItem';

interface SuccessConnectCardSelectorProps {
    companies?: CardAccountsStaticData[];
    onSelect?: (codefCards: CodefCardDto[]) => any;
}

export const SuccessConnectCardSelector = memo((props: SuccessConnectCardSelectorProps) => {
    const orgId = useOrgIdParam();
    const [selectedItems, setSelectedItems] = useState<CodefCardDto[]>([]);
    const {companies = [], onSelect} = props;

    const {data: codefCards, isFetching} = useCodefCardsByCompanies(orgId, companies);

    const select = (changedItems: CodefCardDto[]) => {
        setSelectedItems(changedItems);
        onSelect && onSelect(changedItems);
    };

    const isAllSelected = codefCards.length > 0 && selectedItems.length === codefCards.length;
    const handleSelectAll = () => select(isAllSelected ? [] : codefCards);

    const handleToggle = (item: CodefCardDto) => {
        const changedItems = selectedItems.some(({id}) => id === item.id) // included?
            ? selectedItems.filter(({id}) => id !== item.id) // remove
            : [...selectedItems, item]; // add

        select(changedItems);
    };

    return (
        <ContentSection
            text="카드"
            isAllSelected={isAllSelected}
            handleSelectAll={handleSelectAll}
            isLoading={isFetching}
        >
            <ul className="grid grid-cols-2 gap-3">
                {codefCards.map((codefCard) => (
                    <ConnectedItem
                        key={codefCard.id}
                        mainText={codefCard.resCardName || ''}
                        subText={codefCard.number4 || '알수없음'}
                        url={codefCard.company?.logo}
                        icon={<Landmark className="w-full h-full text-white" />}
                        isSelected={selectedItems.some(({id}) => id === codefCard.id)}
                        onClick={() => handleToggle(codefCard)}
                    />
                ))}
            </ul>
        </ContentSection>
    );
});
