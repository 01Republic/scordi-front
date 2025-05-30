import React, {memo, useState} from 'react';
import {Landmark} from 'lucide-react';
import {useOrgIdParam} from '^atoms/common';
import {useCodefCardsByCompanies} from '^models/CodefCard/hook';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';
import {ContentSection} from '../../../common/ContentSection';
import {ConnectedItem} from '../../../AssetConnectSuccessPageTemplate/ConnectedItem';
import {unitFormat} from '^utils/number';
import Tippy from '@tippyjs/react';

interface SuccessConnectCardSelectorProps {
    codefCards?: CodefCardDto[];
    isLoading?: boolean;
    onSelect?: (codefCards: CodefCardDto[]) => any;
}

export const SuccessConnectCardSelector = memo((props: SuccessConnectCardSelectorProps) => {
    const [selectedItems, setSelectedItems] = useState<CodefCardDto[]>([]);
    const {codefCards = [], isLoading = false, onSelect} = props;

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
            text={
                <span className="flex items-center gap-1">
                    카드 <small className="text-scordi font-bold">({unitFormat(codefCards.length, '')})</small>
                </span>
            }
            isAllSelected={isAllSelected}
            handleSelectAll={handleSelectAll}
            isLoading={isLoading}
        >
            <ul className="grid grid-cols-2 gap-3">
                {codefCards.map((codefCard) => (
                    <ConnectedItem
                        key={codefCard.id}
                        mainText={codefCard.resCardName || ''}
                        subText={
                            <Tippy content={codefCard.cardNumbers.join('-')} className="!text-12">
                                <div>
                                    <span>끝자리: {codefCard.number4 || '알수없음'}</span>
                                </div>
                            </Tippy>
                        }
                        url={codefCard.company?.logo}
                        icon={<Landmark className="w-full h-full text-white" />}
                        onClick={() => handleToggle(codefCard)}
                        isSelected={selectedItems.some(({id}) => id === codefCard.id)}
                        isDisabled={!!codefCard.creditCardId || !!codefCard.isSleep}
                        comment={
                            codefCard.creditCardId ? (
                                '연결된 카드'
                            ) : !!codefCard.isSleep ? (
                                <span className="!text-red-500">휴면 상태</span>
                            ) : (
                                ''
                            )
                        }
                    />
                ))}
            </ul>
        </ContentSection>
    );
});
