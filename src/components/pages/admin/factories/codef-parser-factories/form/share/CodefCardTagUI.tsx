import {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {getColor, palette} from '^components/util/palette';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface CodefCardTagUIProps {
    codefCard?: CodefCardDto;
    onClick?: (codefCard?: CodefCardDto) => any;
}

export const CodefCardTagUI = memo((props: CodefCardTagUIProps) => {
    const {codefCard, onClick} = props;

    if (!codefCard) return <></>;

    const lastCardNum = codefCard.number4;
    const cardColor = getColor(codefCard.id, palette.notionColors);

    return (
        <TagUI className={`!inline ${cardColor}`} onClick={() => onClick && onClick(codefCard)}>
            {lastCardNum}
        </TagUI>
    );
});
CodefCardTagUI.displayName = 'CodefCardTagUI';
