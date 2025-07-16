import {memo} from 'react';
import {useCodefCardsOfCreditCardShow2} from '^models/CodefCard/hook';
import {SyncWithCodefApi} from './SyncWithCodefApi';
import {useIdParam} from '^atoms/common';

export const CreditCardConnected = memo(function CreditCardConnected() {
    const creditCardId = useIdParam('creditCardId');
    useCodefCardsOfCreditCardShow2(creditCardId);

    return (
        <div className="flex items-center gap-2">
            {/*<ConnectedBadgeType1 />*/}
            {/*<ConnectedBadgeType3 />*/}
            <SyncWithCodefApi />
        </div>
    );
});
