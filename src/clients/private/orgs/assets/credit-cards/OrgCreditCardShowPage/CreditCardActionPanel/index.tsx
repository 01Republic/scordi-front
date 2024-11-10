import {memo} from 'react';
import {useCurrentCreditCard} from '../atom';
import {CreditCardConnected} from './CreditCardConnected';
import {CreditCardMoreDropdown} from './CreditCardMoreDropdown';

export const CreditCardActionPanel = memo(function CreditCardActionPanel() {
    return (
        <div className="flex items-center gap-4 justify-end">
            <CreditCardConnected />
            <CreditCardMoreDropdown />
        </div>
    );
});
