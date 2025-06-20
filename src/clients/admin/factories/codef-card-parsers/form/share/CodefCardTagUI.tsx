import {memo} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {getColor, palette} from '^components/util/palette';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface CodefCardTagUIProps {
    codefCard?: CodefCardDto;
    onClick?: (codefCard?: CodefCardDto) => any;
    withCompany?: boolean;
}

export const CodefCardTagUI = memo((props: CodefCardTagUIProps) => {
    const {codefCard, onClick, withCompany = false} = props;

    if (!codefCard) return <></>;

    const lastCardNum = codefCard.number4;
    const cardColor = getColor(codefCard.id, palette.notionColors);
    const company = codefCard.account?.company?.replace('카드', '') || ' - ';

    return (
        <TagUI className={`${cardColor}`} onClick={() => onClick && onClick(codefCard)}>
            {withCompany ? (
                <>
                    #{codefCard.id}. {company}({lastCardNum})
                </>
            ) : (
                lastCardNum
            )}
        </TagUI>
    );
});
CodefCardTagUI.displayName = 'CodefCardTagUI';
