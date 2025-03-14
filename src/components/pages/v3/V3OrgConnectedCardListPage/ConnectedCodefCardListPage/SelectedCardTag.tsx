import React, {memo} from 'react';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {useRecoilStates} from '^hooks/useRecoil';
import {selectedCodefCardAtom} from './atom';
import {getColor, palette} from '^components/util/palette';
import {X} from 'lucide-react';
export const SelectedCardTag = memo(function SelectedCardTag() {
    const {value: codefCard, resetValue: resetSelected} = useRecoilStates(selectedCodefCardAtom);

    const cardColor = codefCard?.creditCardId ? getColor(codefCard.creditCardId, palette.notionColors) : '';

    if (!codefCard) return <></>;

    return (
        <div
            onClick={() => resetSelected()}
            className="flex items-center gap-[2px] group cursor-pointer transition-all"
        >
            <TagUI className={cardColor}>{codefCard.number4}</TagUI>
            <X className="text-14 opacity-30 group-hover:opacity-100" />
        </div>
    );
});
