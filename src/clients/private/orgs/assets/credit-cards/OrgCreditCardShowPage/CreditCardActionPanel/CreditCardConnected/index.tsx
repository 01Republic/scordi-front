import {memo} from 'react';
import {SyncWithCodefApi} from './SyncWithCodefApi';

export const CreditCardConnected = memo(function CreditCardConnected() {
    return (
        <div className="flex items-center gap-2">
            {/*<ConnectedBadgeType1 />*/}
            {/*<ConnectedBadgeType3 />*/}
            <SyncWithCodefApi />
        </div>
    );
});
