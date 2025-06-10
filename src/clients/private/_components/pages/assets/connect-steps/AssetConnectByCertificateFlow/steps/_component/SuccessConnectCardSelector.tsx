import {memo, useState} from 'react';
import {Landmark} from 'lucide-react';
import Tippy from '@tippyjs/react';
import {unitFormat} from '^utils/number';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {ContentSection} from '../../../common/ContentSection';
import {ConnectedItem} from '../../../AssetConnectSuccessPageTemplate/ConnectedItem';

interface Props {
    codefCards?: CodefCardDto[];
    isLoading?: boolean;
    onSelect?: (codefCards: CodefCardDto[]) => any;
}

export const SuccessConnectCardSelector = memo((props: Props) => {
    const {codefCards = [], isLoading = false, onSelect} = props;
    const selectables = codefCards.filter((codefCard) => !codefCard.creditCardId);
    const [selectedItems, setSelectedItems] = useState(selectables);

    const select = (items: CodefCardDto[]) => {
        setSelectedItems(items);
        onSelect && onSelect(items);
    };

    const isAllSelected = codefCards.length > 0 && selectedItems.length === selectables.length;
    const handleSelectAll = () => select(isAllSelected ? [] : selectables);

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
            handleSelectAll={selectables.length > 0 ? handleSelectAll : undefined}
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
