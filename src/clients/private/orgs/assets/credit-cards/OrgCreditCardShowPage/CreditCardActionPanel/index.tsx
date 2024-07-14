import {memo} from 'react';
import {CreditCardMoreDropdown} from './CreditCardMoreDropdown';

export const CreditCardActionPanel = memo(function CreditCardActionPanel() {
    return (
        <div className="flex items-center gap-4 justify-end">
            <CreditCardMoreDropdown />
        </div>
    );
});
