import React, {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {SubscriptionDto} from '^models/Subscription/types';
import {getColor, palette} from '^components/util/palette';
import {useConnectedCodefCards} from '^models/CodefCard/hook';
import {codefAccountIdParamState} from '^atoms/common';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {selectedCodefCardAtom} from './atom';

interface CreditCardLastNumTagProps {
    subscription: SubscriptionDto;
}

export const CreditCardLastNumTag = memo((props: CreditCardLastNumTagProps) => {
    const {subscription} = props;
    const {result: codefCardList} = useConnectedCodefCards(codefAccountIdParamState);
    const selectCodefCard = useSetRecoilState(selectedCodefCardAtom);

    const cardColor = subscription.creditCardId ? getColor(subscription.creditCardId, palette.notionColors) : '';
    const creditCard = (() => {
        const creditCardId = subscription.creditCardId;
        if (!creditCardId) return;
        return codefCardList.items.find((c) => c.creditCardId === creditCardId);
    })();

    const onClick = () => {
        if (creditCard) selectCodefCard(creditCard);
    };

    if (!creditCard) return <></>;

    return (
        <div onClick={onClick}>
            <TagUI className={cardColor}>{creditCard.number4}</TagUI>
        </div>
    );
});
CreditCardLastNumTag.displayName = 'CreditCardLastNumTag';
