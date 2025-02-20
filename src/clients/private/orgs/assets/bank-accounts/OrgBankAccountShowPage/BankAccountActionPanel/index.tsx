import {memo} from 'react';
import {BankAccountMoreDropdown} from './BankAccountMoreDropdown';

export const BankAccountActionPanel = memo(function BankAccountActionPanel() {
    return (
        <div className="flex items-center gap-4 justify-end">
            <BankAccountMoreDropdown />
        </div>
    );
});
