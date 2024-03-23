import React, {memo} from 'react';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {useRecoilStates} from '^hooks/useRecoil';
import {selectedCodefCardAtom} from './atom';
import {getColor, palette} from '^components/util/palette';
import {FaTimes} from '^components/react-icons';
import {LiaTimesSolid} from 'react-icons/lia';
import {IoClose} from 'react-icons/io5';

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
            <IoClose className="text-14 opacity-30 group-hover:opacity-100" />
        </div>
    );
});
