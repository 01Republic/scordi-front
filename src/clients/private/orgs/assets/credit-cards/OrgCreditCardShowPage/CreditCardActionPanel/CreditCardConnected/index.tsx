import {memo, useEffect} from 'react';
import {useCodefCardsOfCreditCardShow} from '^models/CodefCard/hook';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {useCurrentCreditCard} from '../../atom';
import {ConnectedBadgeType3} from './ConnectedBadge';
import {SyncWithCodefApi} from './SyncWithCodefApi';

export const CreditCardConnected = memo(function CreditCardConnected() {
    const {currentCreditCard} = useCurrentCreditCard();
    const {search, reset} = useCodefCardsOfCreditCardShow();

    useEffect(() => {
        if (!currentCreditCard) return;
        search({
            where: {creditCardId: currentCreditCard.id},
            order: {id: 'DESC'},
        });
    }, [currentCreditCard]);

    useEffect(() => () => reset(), []);

    if (!currentCreditCard) return <></>;

    return (
        <div className="flex items-center gap-2">
            {/*<ConnectedBadgeType1 />*/}
            {/*<ConnectedBadgeType3 />*/}
            <SyncWithCodefApi />
        </div>
    );
});
