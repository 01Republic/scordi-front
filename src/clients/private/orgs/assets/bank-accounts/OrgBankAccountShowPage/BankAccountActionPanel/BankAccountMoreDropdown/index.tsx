import {memo} from 'react';
import {MoreDropdown} from '^clients/private/_components/rest-pages/ShowPage/MoreDropdown';
import {ChangeUsingStatusItem} from './ChangeUsingStatusItem';
import {DeleteCreditCardItem} from './DeleteCreditCardItem';

export const BankAccountMoreDropdown = memo(function () {
    return (
        <MoreDropdown>
            <ChangeUsingStatusItem />
            <DeleteCreditCardItem />
        </MoreDropdown>
    );
});
